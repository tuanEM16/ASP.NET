using System.Security.Cryptography;

namespace CMS.Backend.Services
{
    public static class PasswordHasher
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 100_000;
        private const string Prefix = "PBKDF2";

        public static string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                password,
                salt,
                Iterations,
                HashAlgorithmName.SHA256,
                HashSize);

            return $"{Prefix}${Iterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
        }

        public static bool IsHashed(string value)
        {
            return !string.IsNullOrWhiteSpace(value) && value.StartsWith($"{Prefix}$", StringComparison.Ordinal);
        }

        public static bool VerifyPassword(string password, string storedPassword)
        {
            if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(storedPassword))
            {
                return false;
            }

            if (!IsHashed(storedPassword))
            {
                return password == storedPassword;
            }

            var parts = storedPassword.Split('$');
            if (parts.Length != 4 || !int.TryParse(parts[1], out var iterations))
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[2]);
            var storedHash = Convert.FromBase64String(parts[3]);
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                password,
                salt,
                iterations,
                HashAlgorithmName.SHA256,
                storedHash.Length);

            return CryptographicOperations.FixedTimeEquals(hash, storedHash);
        }
    }
}
