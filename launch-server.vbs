Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\Administrator\Desktop\FS CODEX - SALES PAGE - ADV - CHECKOUT\crepey-skin-upsell-1"
Set fs = CreateObject("Scripting.FileSystemObject")
Set logfile = fs.CreateTextFile("vbs-launch.log", True)
logfile.WriteLine "before run"
logfile.Close
shell.Run "cmd.exe /c start-server.bat", 0, False
Set logfile = fs.OpenTextFile("vbs-launch.log", 8, True)
logfile.WriteLine "after run"
logfile.Close
