using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VirtualClassRoom.Server.Models;

namespace VirtualClassRoom.Server.Repo
{
    public class DataRepository
    {
        private static DataRepository instance = new DataRepository();

        public DataRepository()
        {
            instance.Users = new List<UserModel>();
        }

        public void Push(UserModel user)
        {
            instance.Users.Add(user);
        }
        
        public List<UserModel> Users { get; set; }

        public static DataRepository Instance
        {
            get
            {
                return instance;
            }
        }
    }
}