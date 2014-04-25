using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VirtualClassRoom.Server.Models
{
    public class UserModel
    {
        public UserModel()
        {
            // Serialization
        }

        public UserModel(IWebSocketConnection socket)
        {
            this.Socket = socket;
        }

        [NonSerialized]
        internal IWebSocketConnection Socket;

        public string Name { get; set; }

        public string Id { get; set; }
    }
}