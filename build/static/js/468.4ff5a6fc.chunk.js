"use strict";(self.webpackChunkyespace=self.webpackChunkyespace||[]).push([[468],{4468:function(e,t,n){n.r(t);var a=n(7313),l=n(4813),i=n(7829),c=n(5898),r=n(1113),o=n(9099),s=n(6149),u=n(3604),m=n(7131),d=n(9498),f=n(1198),p=n(9716),h=n(7651),x=n(9353),g=n(8467),Z=n(9965),y=n(8796),C=n(1023),E=n(7512),w=n(6735);t.default=function(){(0,E.Z)().address;var e=(0,l.Z)("(max-width:430px)"),t=(0,y.v9)((function(e){return e.auth})),n=t.user,b=t.isLoggedIn,v=(0,y.I0)(),S=(0,g.s0)(),I=(0,Z.Z)().updateAccount,j=(0,a.useState)(!1),k=j[0],z=j[1],N=(0,a.useState)(1),P=N[0],T=N[1],A=e?88:96,D=function(){z(!1),T(1)},L=function(){P<3&&T(P+1),3===P&&I({isCreated:!0}).then((function(e){D(),S("/myyespace"),v((0,C.Cx)(e.data))}))};return(0,a.useEffect)((function(){b&&n.isCreated&&S("/myyespace")}),[b,n]),a.createElement(i.Z,{sx:{height:"calc(100vh - ".concat(A,"px)"),display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"24px"}},a.createElement(i.Z,{component:"img",sx:{width:80,height:80},src:d.Z,alt:"logo",draggable:!1}),a.createElement(c.Z,{gap:"8px",justifyContent:"center",alignItems:"center"},a.createElement(r.Z,{variant:"h6"},"Welcome to Yespace"),a.createElement(r.Z,{sx:{textAlign:"center",color:"rgba(255, 255, 255, 0.8)"}},"Create your space to showcase your NFTs from across chains.")),a.createElement(o.Z,{variant:"contained",color:"warning",onClick:function(){if(!b)return(0,w.Z)({message:"Wallet is not connected",content:"Unable to connect wallet, please try again.",variant:"alert",vertical:"top",horizontal:"right",transition:"SlideLeft"});z(!0)}},"Create Space"),a.createElement(s.Z,{onClose:D,"aria-labelledby":"customized-dialog-title",open:k,sx:{"& .MuiPaper-root":{margin:e?2:"auto",width:e?343:424,height:e?418:438}}},a.createElement(u.Z,{sx:{m:0}},a.createElement(c.Z,{flexDirection:"row",justifyContent:"space-between",position:"relative"},a.createElement(i.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-start"}},!e&&a.createElement(r.Z,{sx:{fontSize:"14px"}},"Step ",P," of 3")),a.createElement(i.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",width:"100%"}},"Create Your Space"),a.createElement(i.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-end"}},a.createElement(m.Z,{"aria-label":"close",onClick:D},a.createElement(f.Z,{sx:{fontSize:"14px"}}))))),1===P&&a.createElement(p.Z,{handleClose:D,handleNextPage:L,hideTitle:!1}),2===P&&a.createElement(h.Z,{handleClose:D,handleNextPage:L,hideTitle:!1}),3===P&&a.createElement(x.Z,{handleClose:D,handleNextPage:L,hideTitle:!1})))}}}]);