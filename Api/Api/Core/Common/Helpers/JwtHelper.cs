using Api.Core.Business.IoC;
using Api.Core.Business.Models;
using JWT;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Core.Common.Helpers
{
    public interface IJwtHelper
    {
        string GenerateToken(JwtPayload payload);

        JwtPayload ValidateToken(string token);
    }

    public class JwtHelper : IJwtHelper
    {
        public string GenerateToken(JwtPayload payload)
        {
            var appSetting = IoCHelper.GetInstance<IOptions<AppSettings>>();

            var token = new JwtBuilder()
                  .WithAlgorithm(new HMACSHA256Algorithm())
                  .WithSecret(appSetting.Value.Secret)
                  .AddClaim("Expired", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds())
                  .AddClaim("JwtPayload", payload)
                  .Build();

            return token;
        }

        public JwtPayload ValidateToken(string token)
        {
            var appSetting = IoCHelper.GetInstance<IOptions<AppSettings>>();

            try
            {
                var json = new JwtBuilder()
                    .WithSecret(appSetting.Value.Secret)
                    .MustVerifySignature()
                    .Decode(token);

                var jwtJsonDecode = JsonConvert.DeserializeObject<JwtJsonDecode>(json);
                if (jwtJsonDecode == null || jwtJsonDecode.JwtPayload == null)
                {
                    return null;
                }
                else
                {
                    return jwtJsonDecode.JwtPayload;
                }
            }
            catch (TokenExpiredException)
            {
                return null;
            }
            catch (SignatureVerificationException)
            {
                return null;
            }
        }
    }

    public class JwtPayload
    {
        public Guid Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public List<Guid> RoleIds { get; set; }

    }

    public class JwtJsonDecode
    {
        public string Expired { get; set; }
        public JwtPayload JwtPayload { get; set; }
    }
}
