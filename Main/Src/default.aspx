<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="VirtualClassRoom._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript">
        function launchMeeting() {
            var link = 'http://localhost:12622/virtualclassroom.html';
            window.open(link, '_blank', 'status=no,toolbar=no,menubar=no,location=yes,directories=no,resizable=yes,scrollbars=yes,maximized=yes');
        };
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:Button runat="server" Text="Start Server" OnClick="Unnamed_Click" />
            <input id="launch" type="button" value="Launch Meeting" onclick="launchMeeting()"/>
        </div>
    </form>
</body>
</html>
