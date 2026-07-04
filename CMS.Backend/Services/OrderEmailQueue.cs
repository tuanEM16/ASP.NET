using CMS.Data.Entities;
using System.Threading.Channels;

namespace CMS.Backend.Services
{
    public record OrderEmailWorkItem(
        Order Order,
        Customer Customer,
        IReadOnlyCollection<OrderDetail> Details);

    public interface IOrderEmailQueue
    {
        bool TryQueue(OrderEmailWorkItem workItem);
        IAsyncEnumerable<OrderEmailWorkItem> ReadAllAsync(CancellationToken cancellationToken);
    }

    public class OrderEmailQueue : IOrderEmailQueue
    {
        private readonly Channel<OrderEmailWorkItem> _channel =
            Channel.CreateUnbounded<OrderEmailWorkItem>(new UnboundedChannelOptions
            {
                SingleReader = true,
                SingleWriter = false
            });

        public bool TryQueue(OrderEmailWorkItem workItem)
        {
            return _channel.Writer.TryWrite(workItem);
        }

        public IAsyncEnumerable<OrderEmailWorkItem> ReadAllAsync(CancellationToken cancellationToken)
        {
            return _channel.Reader.ReadAllAsync(cancellationToken);
        }
    }

    public class OrderEmailWorker : BackgroundService
    {
        private readonly IOrderEmailQueue _queue;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly ILogger<OrderEmailWorker> _logger;

        public OrderEmailWorker(
            IOrderEmailQueue queue,
            IServiceScopeFactory scopeFactory,
            ILogger<OrderEmailWorker> logger)
        {
            _queue = queue;
            _scopeFactory = scopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach (var workItem in _queue.ReadAllAsync(stoppingToken))
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailSender = scope.ServiceProvider.GetRequiredService<IEmailSender>();

                    await emailSender.SendOrderConfirmationAsync(
                        workItem.Order,
                        workItem.Customer,
                        workItem.Details);
                }
                catch (Exception exception)
                {
                    _logger.LogError(
                        exception,
                        "Không thể gửi email xác nhận cho đơn hàng {OrderId}.",
                        workItem.Order.Id);
                }
            }
        }
    }
}
