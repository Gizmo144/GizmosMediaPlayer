using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CassiniDev;
using System.IO;

namespace MyMediaPlayerHost
{
    public partial class frmMain : Form
    {
        private readonly CassiniDevServer _server;
        public frmMain()
        {
            InitializeComponent();
            
            var ChromeBrowser = new CefSharp.WinForms.ChromiumWebBrowser("http://google.com")
            {
                Dock = DockStyle.Fill
            };
            this.Controls.Add(ChromeBrowser);
            
            _server = new CassiniDevServer();

            _server.StartServer(@"H:\visual studio 2013\Projects\MyMediaPlayer\MyMediaPlayer");

            //ChromeBrowser.Navigate(_server.NormalizeUrl(@"MyMedia\Index"));
            //ChromeBrowser.
            ChromeBrowser.Load(_server.NormalizeUrl(@"MyMedia\Index"));
        }

        private void frmMain_Load(object sender, EventArgs e)
        {

        }

        private void frmMain_FormClosing(object sender, FormClosingEventArgs e)
        {
            _server.StopServer();
        }
    }
}
