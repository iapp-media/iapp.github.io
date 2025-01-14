﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MiniMaster.Master" AutoEventWireup="true" CodeBehind="Cust_Mana.aspx.cs" Inherits="StoreMana.Cust_Mana" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="Allswiper">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <asp:Literal ID="Sub_Menu" runat="server"></asp:Literal>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>
    <!-- WRAPPER -->
    <div class="buydivmove">
        <div class="insidecare col-xs-12">
            <div class="row">
                <div class="CustBar">
                    <div class="col-xs-8 Custsend">

                        <asp:TextBox ID="TBName" runat="server" Class="form-control" placeholder="輸入姓名查詢"></asp:TextBox>

                    </div>
                    <div class="col-xs-4 col-sm-2">
                        <asp:Button ID="BT_Search" runat="server" Text="搜尋" CssClass="btn btn-warning SBuyCar2" OnClick="BT_Search_Click" />
                    </div>

                </div>




                <asp:Repeater ID="RP1" runat="server">
                    <HeaderTemplate>
                        <div>
                            <div class="ProMLtit col-xs-12">
                                <div class="ListBG">
                                    <div class="col-xs-4 ListTitle2">名次</div>
                                    <div class="col-xs-4 ListTitle2">姓名</div>
                                    <div class="col-xs-4 ListTitle2">點擊次數</div>
                                    <div class="col-xs-12 ListTitle2">產品名稱</div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </HeaderTemplate>
                    <ItemTemplate>

                        <div class="ProMaBOX col-xs-12 ToBoPad">
                            <div class="ProMain col-xs-12">
                                <div class="col-xs-4 ProLPad AlltexC BorTopno BorLeftpno TRBC">
                                    <asp:Literal ID="Literal1" runat="server" Text='<%# Bind("ROWID")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-4 ProLPad AlltexC BorTopno TRBC">
                                    <asp:Literal ID="Literal2" runat="server" Text='<%# Bind("User_Name")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-4 ProLPad AlltexC BorTopno BorRightno TRBC">
                                    <asp:Literal ID="Literal3" runat="server" Text='<%# Bind("ck")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-12 ProLPad AlltexC BorLeftpno BorBottompno TRBC">
                                    <asp:Literal ID="Literal5" runat="server" Text='<%# Bind("Product_Name")%>'></asp:Literal>
                                </div>
                            </div>
                        </div>
                            
                    </ItemTemplate>
                </asp:Repeater>
                <asp:Literal ID="L1" runat="server" Visible="false"></asp:Literal>
                <asp:SqlDataSource ID="SD1" runat="server"></asp:SqlDataSource>


                <asp:Repeater ID="RP2" runat="server">
                    <HeaderTemplate>
                        <div>
                            <div class="ProMLtit col-xs-12">
                                <div class="ListBG">
                                    <div class="col-xs-4 ListTitle2">名次</div>
                                    <div class="col-xs-4 ListTitle2">姓名</div>
                                    <div class="col-xs-4 ListTitle2">介紹人次</div>
                                    <div class="col-xs-12 ListTitle2">產品名稱</div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </HeaderTemplate>
                    <ItemTemplate>
                        <div class="ProMaBOX col-xs-12 ToBoPad">
                            <div class="ProMain col-xs-12">
                                <div class="col-xs-4 ProLPad AlltexC BorTopno BorLeftpno TRBC">
                                    <asp:Literal ID="Literal1" runat="server" Text='<%# Bind("ROWID")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-4 ProLPad AlltexC BorTopno TRBC">
                                    <asp:Literal ID="Literal2" runat="server" Text='<%# Bind("User_Name")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-4 ProLPad AlltexC BorTopno BorRightno TRBC">
                                    <asp:Literal ID="Literal3" runat="server" Text='<%# Bind("ck")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-12 ProLPad AlltexC BorTopno BorRightno TRBC">
                                    辣椒一枝
                                </div> 
                            </div>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>
                <asp:Literal ID="L2" runat="server" Visible="false"></asp:Literal>
                <asp:SqlDataSource ID="SD2" runat="server"></asp:SqlDataSource>


                <asp:Repeater ID="RP3" runat="server">
                    <HeaderTemplate>
                        <div>
                            <div class="ProMLtit col-xs-12">
                                <div class="ListBG">
                                    <div class="Ltitbox">
                                        <div class="col-xs-4 ListTitle1">姓名</div>
                                        <div class="col-xs-8 ListTitle2">Email</div>
                                        <div class="col-xs-8 ListTitle2">電話</div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </HeaderTemplate>
                    <ItemTemplate>
                        <div class="ProMaBOX col-xs-12 ToBoPad">
                            <div class="ProMain">
                                <div class="col-xs-4 ProLPad AlltexC ListNVa TRBC">
                                    <asp:Literal ID="Literal5" runat="server" Text='<%# Bind("User_Name")%>'></asp:Literal> 
                                </div>
                                <div class="col-xs-8 ProLPad AlltexC ListMVa TRBC">
                                    <asp:Literal ID="Literal3" runat="server" Text='<%# Bind("Account")%>'></asp:Literal>
                                </div>
                                <div class="col-xs-8 ProLPad AlltexC ListpVa TRBC">
                                    <asp:Literal ID="Literal4" runat="server" Text='<%# Bind("TEL")%>'></asp:Literal>
                                </div>
                            </div>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>
                <asp:Literal ID="L3" runat="server" Visible="false"></asp:Literal>
                <asp:SqlDataSource ID="SD3" runat="server"></asp:SqlDataSource>
            </div>
        </div>
    </div>
</asp:Content>
