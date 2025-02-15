﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MiniMaster.Master" AutoEventWireup="true" CodeBehind="Setting_SInfo.aspx.cs" Inherits="StoreMana.Setting_SInfo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/index.css" />
    <link rel="stylesheet" href="css/cropper.css" />
    <link rel="stylesheet" href="css/mobileEditor.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div id="Allswiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-src="Setting.aspx">參數設定</div>
                <div class="swiper-slide" data-src="Setting_SInfo.aspx">微店管理</div>
                <div class="swiper-slide" data-src="Setting_Gerent.aspx">帳號管理</div>
                <div class="swiper-slide" data-src="Setting_Bonus.aspx">點數設定</div>
            </div>
             <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>

    <div class="buydivmove">
        <div class="upload-img">
            <div class="top">
                <div class="toplogo"></div>
                <div class="cancelimgfun"></div>
            </div>
            <div class="upload-page">
                <label for="inputImage" class="selectBTN">
                    <div class="selectBTNin">
                        選擇照片
                    </div>
                </label>
                <div class="rotate">
                    <button data-method="rotate" type="button" class="rotate-btn">旋轉</button>
                </div>
                <div class="preview-container" style="display: none;">
                    <img id="preview" src="" />
                </div>
                <div class="img-container">
                    <img src="" alt="支持圖片上傳格式JPG,PNG" />
                </div>
                <p class="word">(移動及縮放進行照片裁切)</p>
                <asp:TextBox ID="CurrentId" runat="server" CssClass="hide" ClientIDMode="Static"></asp:TextBox>
                <input id="picnum" value="" class="hide" />
                <input type="file" accept="image/*" id="inputImage" style="display: none;" />
                <button data-method="getCroppedCanvas" type="button" id="cut" class="cut" disabled="true">
                    截圖
                </button>
                <button onclick="compress()" type="button" class="compress">
                    確認
                </button>
                <input id="Tbase64" value="" style="display: none;" />

            </div>
        </div>

        <div class="col-xs-12 insidecare">
            <div class="row">
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">商店名稱</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBName" Font-Names="TBName" runat="server" CssClass="form-control magclose" onkeyup="words_deal(12)"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC">
                    <div class="col-xs-12">
                        <div class="row">
                            <p class="BoxLeft">商店封面</p>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="row Sinfoheadimg">
                            <%--                            <img id="psimg" src="" class="sliderimgH" />--%>
                            <div>
                                <asp:Image ID="psimg" runat="server" ClientIDMode="Static" />
                            </div>
                            <label class="uploadBTN" onclick="setCurrent()">
                                <%--<img src="img/uploadicon.png" alt="..." class="imgsize poscenter clickslider openslider Addbutton" />--%>
                            </label>
                        </div>
                    </div>
                </div>
                 <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">選購介面</p>
                        </div>
                    </div>
                    <asp:DropDownList ID="DLlayout" runat="server" CssClass="form-control">
                        <asp:ListItem Value="0">basic基本場景</asp:ListItem>
                        <asp:ListItem Value="5">fast 快速場景</asp:ListItem>
                    </asp:DropDownList>
                </div>
                 <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">聯絡人</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBCEO" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>

                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">聯絡電話</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBTEL" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">聯絡地址</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBAddr" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">公休日</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TB_DayOff" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">營業時間</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TB_OPTime" runat="server" CssClass="form-control magclose" TextMode="MultiLine"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">付款方式</p>
                        </div>
                    </div>
                    <div class="col-xs-8 SinCheck apple_checkbox">
                        <div class="row">
                            <asp:CheckBoxList ID="CB_Payment" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" RepeatColumns="1">
                            </asp:CheckBoxList>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">寄送方式</p>
                        </div>
                    </div>
                    <div class="col-xs-8 SinCheck apple_checkbox">
                        <div class="row">
                            <%--<div class="apple_checkbox-1">
                                <p>面交自取</p>
                                <p>宅配</p>
                            </div>--%>
                            <asp:CheckBoxList ID="CB_Delivery" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" RepeatColumns="1">
                            </asp:CheckBoxList>
                        </div>
                    </div>
                </div>
               
                <%--                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">店家帳號</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBStoreNID" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>--%>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">銀行名稱</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBBankName" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">銀行代碼</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBBankNo" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">受款帳號</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBACC" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor paynumber PadLib ProGrayC BorTop">
                    <div class="col-xs-4">
                        <div class="row">
                            <p class="BoxLeft">受款戶名</p>
                        </div>
                    </div>
                    <asp:TextBox ID="TBACName" runat="server" CssClass="form-control magclose"></asp:TextBox>
                </div>
                <div class="col-xs-12 libor status CBbot CBBTN">
                    <asp:Button ID="BT_Save" runat="server" Text="儲存" CssClass="btn btn-warning col-xs-12 sendcareButtom" OnClick="BT_Save_Click" />
                </div>
            </div>
        </div>
    </div>
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/exif.js"></script>
    <script src="js/JIC.js"></script>
    <script src="js/cropper.js"></script>
    <script src="js/mobileEditor-store.js"></script>
    <%--<script src="js/mobileEditor-new.js"></script>--%>
    <script>

        var texttmp = $("#ContentPlaceHolder1_TBName").val();
        function words_deal(cct) {
            var curLength = getlength($("#ContentPlaceHolder1_TBName").val());
            if (curLength > cct) {
                document.getElementById('ContentPlaceHolder1_TBName').value = texttmp;
                alert("超過字數限制，多出的字將被移除！");
            } else {
                texttmp = $("#ContentPlaceHolder1_TBName").val();
            }
        }
        function getlength(str) {
            var arr = str.match(/[^\x00-\xff]/ig);
            return (arr == null) ? str.length : str.length + arr.length;
        }
    </script>
</asp:Content>
