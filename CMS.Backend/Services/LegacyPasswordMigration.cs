using CMS.Data;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Services
{
    public static class LegacyPasswordMigration
    {
        public static async Task HashLegacyPasswordsAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            var users = await context.Users
                .Where(user => !user.PasswordHash.StartsWith("PBKDF2$"))
                .ToListAsync();

            foreach (var user in users)
            {
                user.PasswordHash = PasswordHasher.HashPassword(user.PasswordHash);
            }

            var customers = await context.Customers
                .Where(customer => !customer.Password.StartsWith("PBKDF2$"))
                .ToListAsync();

            foreach (var customer in customers)
            {
                customer.Password = PasswordHasher.HashPassword(customer.Password);
            }

            if (users.Count > 0 || customers.Count > 0)
            {
                await context.SaveChangesAsync();
            }
        }
    }
}
