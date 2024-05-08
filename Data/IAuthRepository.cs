using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Dtos.User;
using ITP_Intellecta.Models;

namespace ITP_Intellecta.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(User user, string password);
        Task<ServiceResponse<string>> Login(string email, string password);
        Task<bool> UserExists(string email);
        // Task<ServiceResponse<int>> CheckAdmin();
        // Task<ServiceResponse<int>> ApproveAdmin();
        Task<ServiceResponse<List<UserRegisterDto>>> GetAllUsers();
    }
}