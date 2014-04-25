using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using VirtualClassRoom.Server.Models;
using VirtualClassRoom.Server.Repo;

namespace VirtualClassRoom.Server.Services
{
    /// <summary>
    /// Summary description for classroomservice
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class ClassRoomService : System.Web.Services.WebService
    {

        [WebMethod]
        public List<UserModel> GetAllUsers()
        {
            return DataRepository.Users;
        }
    }
}
