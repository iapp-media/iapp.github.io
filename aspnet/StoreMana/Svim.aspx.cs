﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data; 
using System.IO;

namespace StoreMana
{
    public partial class Svim : System.Web.UI.Page
    {
        JDB Main = new JDB();
        CommTool Comm = new CommTool(); 

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Main.WriteLog("d='" + Request["d"] + "'");
                string do2 = "";
                if (Main.IsNumeric(Request["i"]) && Main.IsNumeric(Request["d"].Replace("-", "")))
                {
                    int CurrentId = 0; 
                    string PID = Request["d"];

                    if (PID == "")
                    {
                        Response.Write("Error s101");
                        Response.End();
                        return;
                    }
                    do2 = Main.Scalar("Select isnull(sum(1),0) from Product_Img where num='" + Main.Cint2(Request["i"]) + "' and product_id='" + PID + "'");

                    if (do2 != "0")
                    {
                        CurrentId = Comm.Cint2(Main.Scalar("Select IDNo from Product_Img where num=1 and product_id=" + PID));
                        if (CurrentId == 0)
                        {
                            Response.Write("Error s102");
                            Response.End();
                            return;
                        }
                    }
                     string CoNum = Request["i"];
                     
                    if (string.IsNullOrEmpty(Request["t"]))
                    {
                        Response.Write("Error s103");
                        Response.End();
                        return;
                    }

                    if (do2 == "0") //insert 
                    {

                        string Folder = Comm.CheckAppFolder();
                        string FileName = Comm.ImgSerial(Main.Cint2(PID), Main.Cint2(CoNum));
                        string FullPath = Comm.MiStorePath + "\\Itempic\\" + Folder + "\\" + FileName + ".jpg";
                        if (File.Exists(FullPath) == true)
                            File.Delete(FullPath);

                        try
                        {
                            byte[] buf = Convert.FromBase64String(Request["t"]);
                            FileStream TYU = new FileStream(FullPath, FileMode.CreateNew);
                            TYU.Write(buf, 0, buf.Length);
                            TYU.Close();
                        }
                        catch (Exception ex)
                        {
                            Comm.WriteLog(ex.Message);
                        }
                        Main.ParaClear();
                        Main.ParaAdd("@path", "Itempic/" + Folder.Trim() + "/" + FileName + ".jpg", System.Data.SqlDbType.NVarChar);
                        Main.ParaAdd("@Folder", Folder, System.Data.SqlDbType.NVarChar);
                        Main.ParaAdd("@Num", Main.Cint2(CoNum), System.Data.SqlDbType.NVarChar);
                        Main.ParaAdd("@idno", PID, System.Data.SqlDbType.NVarChar);

                        Main.NonQuery("insert into Product_Img (Product_ID, Num, Folder, FilePath) values " +
                                      "(@idno, @Num, @Folder, @path)"); 
                        Response.Write(Comm.MiStoreUrl + "Itempic/" + Folder.Trim() + "/" + FileName + ".jpg");
                    }
                    else
                    {
                        //

                        string Folder = Comm.CheckAppFolder();
                        string FileName = Comm.ImgSerial(Main.Cint2(PID), Main.Cint2(CoNum));
                        string FullPath = Comm.MiStorePath + "\\Itempic\\" + Folder + "\\" + FileName + ".jpg";
                        if (File.Exists(FullPath) == true)
                            File.Delete(FullPath); 
                        try
                        {
                            byte[] buf = Convert.FromBase64String(Request["t"]);
                            FileStream TYU = new FileStream(FullPath, FileMode.CreateNew);
                            TYU.Write(buf, 0, buf.Length);
                            TYU.Close();
                        }
                        catch (Exception ex)
                        {
                            Comm.WriteLog(ex.Message);
                        }
                        Main.ParaClear();
                        Main.ParaAdd("@path", "Itempic/" + Folder.Trim() + "/" + FileName + ".jpg", System.Data.SqlDbType.NVarChar);
                        Main.ParaAdd("@PageID", Main.Cint2(CurrentId), SqlDbType.Int);
                        Main.NonQuery("Update Product_Img set FilePath=@path where IDNo=@PageID"); 
                        Response.Write(Comm.MiStoreUrl + "Itempic/" + Folder.Trim() + "/" + FileName + ".jpg");  
                    } 
                    //END IF DOTHING
                }
                Response.End();
            }
        }
    }
}