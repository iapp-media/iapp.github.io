﻿<%@ Page Title="" Language="C#" MasterPageFile="~/BuyFont.Master" AutoEventWireup="true" CodeBehind="Order_history.aspx.cs" Inherits="MiniStore.Order_history" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="col-xs-12 libor ContentTop">
        <div class="backarrow" onclick="javascript:history.back()"></div>
        <h1>購買記錄</h1>

    </div>
    <ul class="buydivmove">
        <li>
            <div class="col-xs-12 insidecare">
                <div class="row">
                    <div class="col-xs-12 BTbox1">
                        <p class="BTleft1">目前紅利點數</p>
                        <span>
                            <asp:Literal ID="Lbonus" runat="server"></asp:Literal>點</span>
                        <div class="clearfix"></div>
                    </div>
                    <div class="col-xs-12 BTbox">
                        <p class="BTleft">篩選</p>
                        <asp:DropDownList ID="DLDate" runat="server" CssClass="BTright">
                            <asp:ListItem Value="<">三個月內訂單</asp:ListItem>
                            <asp:ListItem Value=">=">三個月以上訂單</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="col-xs-12 BTbox">
                        <asp:DropDownList ID="DL_Payment" runat="server" CssClass="BTright"></asp:DropDownList>
                    </div>
                    <div class="col-xs-12 BTbox">
                        <asp:TextBox ID="TB_Search" runat="server" placeholder="請輸入商品名稱" Class="Hisvalue"></asp:TextBox>
                    </div>
                    <div class="col-xs-12 libor CBbot CBarea CBline">
                        <div></div>
                    </div>
                    <div class="col-xs-12 BTbox BorObot">
                        <asp:Button ID="BT_Search" runat="server" Text="查詢" OnClick="BT_Search_Click" CssClass="btn btn-warning col-xs-12 SBuyCar" />
                    </div>
                    <div class="col-xs-12 libor paynumber padReset ManaLBG">
                        <asp:Repeater ID="RP1" runat="server" OnItemCommand="RP1_ItemCommand"  >
                            <HeaderTemplate>
                                <div class="ProMLtit col-xs-12">
                                    <div class="col-xs-3">&nbsp</div>
                                    <div class="col-xs-8">
                                        <div class="col-xs-6 BoxCenter ListTitle">
                                            <div class="row">
                                                訂單狀態
                                            </div>
                                        </div>
                                        <div class="col-xs-6 BoxCenter ListTitle">
                                            <div class="row">
                                                訂單編號
                                            </div>
                                        </div>
                                        <div class="col-xs-6 BoxCenter ListTitle">
                                            <div class="row">
                                                實付金額
                                            </div>
                                        </div>
                                        <div class="col-xs-6 BoxCenter ListTitle">
                                            <div class="row">
                                                下單時間
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-1">&nbsp</div>
                                </div>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <div class="col-xs-12">
                                    <div class="row">
                                        <asp:LinkButton ID="LBT_prn" runat="server" CssClass="ProMaBOX">
                                            <asp:Literal ID="LIDNO" runat="server" Visible="false" Text='<%# Eval("IDNo")%>'></asp:Literal> 
                                            <%--<asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl='<%# ShowDetail(Eval("IDNo")) %>' CssClass="ProMaBOX"> --%> 
                                            <div class="col-xs-3 ProMaBOXIMG">
                                                <img src='<%# Eval("FilePath")%>' alt="Alternate Text" /> 
                                            </div>
                                            <div class="col-xs-8 Orderlist">
                                                <div class="row">
                                                    <div class="col-xs-6 ListIn ProLPad BorTopno">
                                                        <div class="row">
                                                            <asp:Literal ID="Literal3" runat="server" Text='<%# Bind("Memo")%>'></asp:Literal>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 ListIn ProLPad BorTopno">
                                                        <div class="row">
                                                            <asp:Literal ID="Literal1" runat="server" Text='<%# Bind("Order_No")%>'></asp:Literal>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 ListIn ProLPad BorBottompno">
                                                        <div class="row">
                                                            <asp:Literal ID="Literal2" runat="server" Text='<%# Bind("Total_AMT","{0:#,##0}")%>'></asp:Literal>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 ListIn ProLPad BorBottompno">
                                                        <div class="row">
                                                            <asp:Literal ID="Literal4" runat="server" Text='<%# Bind("CDate")%>'></asp:Literal>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-1 ProLast">
                                                <div class="ProLastIn">
                                                    <img src="img/arrow.png" alt="Alternate Text" />
                                                </div>
                                            </div>

                                            <%--  </asp:HyperLink>--%>
                                        </asp:LinkButton>
                                    </div>
                                </div>
                            </ItemTemplate>
                           
                        </asp:Repeater> 
                                       
                    </div>
                    <asp:Literal ID="L" runat="server" Visible="false"></asp:Literal>
                    <asp:SqlDataSource ID="SD1" runat="server"   ></asp:SqlDataSource>
                </div>
            </div>
        </li>
    </ul>

</asp:Content>
