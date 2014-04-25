using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VirtualClassRoom.Server.Models;

namespace VirtualClassRoom.Server.Repo
{
    public class DataRepository
    {
        static DataRepository()
        {
            Users = new List<UserModel>();
        }

        public static void Push(UserModel user)
        {
            Users.Add(user);
        }
        
        public static List<UserModel> Users { get; set; }
    }
}