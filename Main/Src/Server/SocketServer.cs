using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VirtualClassRoom.Server.Models;
using VirtualClassRoom.Server.Repo;

namespace VirtualClassRoom.Server
{
    public class SocketServer
    {
        public void Start(string id)
        {
            List<IWebSocketConnection> connections = new List<IWebSocketConnection>();
            WebSocketServer server = new WebSocketServer("ws://localhost:8181/" + id);

            server.Start(socket =>
            {
                socket.OnOpen += () =>
                {
                    string path = socket.ConnectionInfo.Path;
                    string username = path.Substring(1, path.Length - 1);
                    var user = new UserModel(socket);
                    user.Name = username;
                    user.Id = socket.ConnectionInfo.Id.ToString();
                    DataRepository.Push(user);
                };

                socket.OnClose += () =>
                {
                    DataRepository.Users.RemoveAll(t => t.Socket == socket);
                };

                socket.OnMessage += (message) =>
                {
                    DataRepository.Users.ForEach(t => t.Socket.Send(message));
                };
            });
        }
    }
}