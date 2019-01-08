(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{161:function(e,t){},162:function(e,t,a){e.exports=a.p+"static/media/Logo.4b14043b.svg"},192:function(e,t,a){e.exports=a(342)},197:function(e,t,a){},206:function(e,t,a){},208:function(e,t,a){},342:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"setActiveArea",function(){return G});var o=a(0),l=a.n(o),s=a(52),r=a.n(s),i=(a(197),a(25)),c=a(26),m=a(32),u=a(30),d=a(31),h=a(362),b=a(352),p=a(28),v=a(53),g=a.n(v),f=a(161),E=a(21),y=(a(206),a(343)),x=a(359),k=a(354),j=a(162),I=a.n(j),T=(a(208),function(e){function t(e,a){var n;Object(i.a)(this,t),n=Object(m.a)(this,Object(u.a)(t).call(this,e,a));var o=localStorage.getItem("selectedArea");return null===o&&(o=0),n.state={opened:!0,selectedArea:o},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"Sidebar"},l.a.createElement("header",{className:"App-header"},l.a.createElement(y.a,{src:I.a,alt:"The Death of Cain: Online Area Builder",title:"The Death of Cain: Online Area Builder"}),l.a.createElement("nav",null,l.a.createElement(x.a,{text:!0,vertical:!0},l.a.createElement(x.a.Item,{as:k.a,to:"/areas/"},"Areas"),0!==this.state.selectedArea&&l.a.createElement("span",null,l.a.createElement(x.a.Item,{as:k.a,to:"/rooms/"},"Rooms"),l.a.createElement(x.a.Item,{as:k.a,to:"/mobs/"},"Mobs"),l.a.createElement(x.a.Item,{as:k.a,to:"/objects/"},"Objects"))))))}}]),t}(o.Component)),O=a(38),_=a(55),N=a(16),S=a(351),A=a(360),w=a(361),C=a(350),D=a(355),M=a(358),R=a(104),X=a(357),H=a(353),L=a(356),V={dbVersion:"1.0",dbName:"tdoc_olc",dbSize:2097152,dbDescription:"Local Storage database for the Online Area Builder for The Death of Caine mud."},F=a(322),q=function(e){function t(e,a){var n;Object(i.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e,a))).handleSubmit=function(){console.log(n.state.mob);var e=[];n.state.mob.ac<0&&e.push({field:"ac",message:"Armor must be a positive number."}),n.state.mob.ac>1e4&&e.push({field:"ac",message:"Armor cannot go higher than 10,000. This gives the mob a 95% damage reduction. Maybe you should make it stance to make it even stronger?"}),n.state.mob.hp<500&&e.push({field:"hp",message:"You cannot set the hp value to less than 500."}),n.state.mob.hp>25e4&&e.push({field:"hp",message:"You cannot set the hp value to more than 250000. Might we suggest increasing the remort level to make it tougher to kill?"}),0===n.state.mob.name.length&&e.push({field:"name",message:"Name cannot be blank."}),0===n.state.mob.short_description.length&&e.push({field:"short_description",message:"Short Description cannot be blank."}),0===n.state.mob.long_description.length&&e.push({field:"long_description",message:"Long Description cannot be blank."}),0===n.state.mob.description.length&&e.push({field:"description",message:"Description cannot be blank."}),(n.state.mob.alignment>1e3||n.state.mob.alignment<-1e3)&&e.push({field:"alignment",message:"Alignment must be between 1000 and -1000"}),n.state.mob.level<=0&&e.push({field:"level",message:"Mob level must be greater than 0."}),n.state.mob.level>25e4&&e.push({field:"level",message:"Mob level cannot be greater than 250,000."}),n.state.mob.exp_level<=0&&e.push({field:"exp_level",message:"EXP level must be greater than 0."}),n.state.mob.exp_level>25e4&&e.push({field:"exp_level",message:"EXP level cannot be greater than 250,000."}),n.state.mob.hitroll<=0&&e.push({field:"hitroll",message:"Hitroll must be greater than 0."}),n.state.mob.hitroll>7500&&e.push({field:"hitroll",message:"Hitroll cannot be greater than 7,500."}),n.state.mob.damroll<=0&&e.push({field:"damroll",message:"Damroll must be greater than 0."}),n.state.mob.damroll>7500&&e.push({field:"damroll",message:"Damroll cannot be greater than 7,500."}),n.setState({errors:e}),0===e.length&&(0===n.state.mobId?n.saveMob():n.updateMob())};var o=localStorage.getItem("selectedArea");return null===o&&(o=0),n.state={selectedArea:o,errors:[],mobId:0,niceName:"Create Mob",mobs:[{vnum:0,name:"first mob areaname",short_description:"my first mob",long_description:"This is my first mob. Ain't it perty?"}],mob:{vnum:0,name:"",short_description:"",long_description:"",description:"",act:0,affected_by:0,alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0},genders:[{key:"0",text:"Unsullied",value:"0"},{key:"1",text:"Male",value:"1"},{key:"2",text:"Female",value:"2"}],affects:[{key:"0",text:"Invis",value:"2"},{key:"1",text:"Detect Invis",value:"8"},{key:"2",text:"Detect Hidden",value:"32"},{key:"3",text:"Shadow Plane",value:"64"},{key:"4",text:"Sanct",value:"128"},{key:"5",text:"Faerie Fire",value:"256"},{key:"6",text:"Infravision",value:"512"},{key:"7",text:"Prot vs Evil",value:"8192"},{key:"8",text:"Sneak",value:"32768"},{key:"9",text:"Hide",value:"65536"},{key:"10",text:"Flying",value:"524288"},{key:"11",text:"Pass Door",value:"1048576"},{key:"12",text:"Shadow Sight",value:"4194304"}]},n.getMob=n.getMob.bind(Object(N.a)(Object(N.a)(n))),n.getMobs=n.getMobs.bind(Object(N.a)(Object(N.a)(n))),n.saveMob=n.saveMob.bind(Object(N.a)(Object(N.a)(n))),n.updateMob=n.updateMob.bind(Object(N.a)(Object(N.a)(n))),n.handleChange=n.handleChange.bind(Object(N.a)(Object(N.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(N.a)(Object(N.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getMobs(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({mobId:this.props.match.params.mobId,niceName:"Update Mob"}),this.getMob(this.props.match.params.mobId)),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getMobs(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({mobId:this.props.match.params.mobId,niceName:"Update Mob"}),this.getMob(this.props.match.params.mobId)),document.title=this.state.niceName}},{key:"getMobs",value:function(){var e=localStorage.getItem("mobs");null!=e&&this.setState({mobs:JSON.parse(e)||this.state.mobs})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;("level"!==a&&"exp_level"!==a&&"alignment"!==a&&"hitroll"!==a&&"damroll"!==a&&"ac"!==a&&"hp"!==a&&"gold"!==a&&"sex"!==a||F(n))&&(this.setState(function(e){return{mob:Object(_.a)({},e.mob,Object(O.a)({},a,n))}}),this.setState({unsaved:!0}))}},{key:"getMob",value:function(e){console.log(e);var t=this,a={vnum:1,name:"",short_description:"",long_description:"",description:"",act:0,affected_by:0,alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0};openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(n){n.executeSql("SELECT * FROM mobs WHERE area_id = '"+t.state.selectedArea+"' AND vnum = '"+e+"'",[],function(e,n){n.rows.length&&(a=n.rows[0],t.setState({mob:a}))},function(e){console.log(e)})}),console.log(a)}},{key:"saveMob",value:function(){var e=this;console.log("Trying to save"),openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(t){t.executeSql("INSERT INTO mobs (vnum, name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.state.mob.vnum,e.state.mob.name,e.state.mob.short_description,e.state.mob.long_description,e.state.mob.description,e.state.mob.act,e.state.mob.affected_by,e.state.mob.alignment,e.state.mob.level,e.state.mob.exp_level,e.state.mob.hitroll,e.state.mob.damroll,e.state.mob.ac,e.state.mob.hp,e.state.mob.gold,e.state.mob.sex,e.state.selectedArea],function(t,a){e.props.history.push("/mobs/"+a.insertId+"/")},function(e){console.log(e)})})}},{key:"updateMob",value:function(){var e=this;console.log("Trying to update"),openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(t){t.executeSql("UPDATE MOBS set name = ?, short_description = ?, long_description = ?, description = ?, act = ?, affected_by = ?,  alignment = ?, level = ?, exp_level = ?, hitroll = ?, damroll = ?, ac = ?, hp = ?, gold = ?, sex = ? WHERE id = ?",[e.state.mob.name,e.state.mob.short_description,e.state.mob.long_description,e.state.mob.description,e.state.mob.act,e.state.mob.affected_by,e.state.mob.alignment,e.state.mob.level,e.state.mob.exp_level,e.state.mob.hitroll,e.state.mob.damroll,e.state.mob.ac,e.state.mob.hp,e.state.mob.gold,e.state.mob.sex,e.state.mobId],function(t,a){e.getMobs()},function(e){console.log(e)})})}},{key:"render",value:function(){return l.a.createElement("div",{className:"wrap fade-in"},l.a.createElement(A.a,{placeholder:!0},l.a.createElement(w.a,{columns:2,stackable:!0,textAlign:"center"},l.a.createElement(C.a,{vertical:!0}),l.a.createElement(w.a.Row,{verticalAlign:"top"},l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"mobs-list",className:"fade-in"},this.state.mobs.map(function(e){return l.a.createElement(D.a,{key:e.vnum,divided:!0,relaxed:!0},l.a.createElement(D.a.Item,null,l.a.createElement(D.a.Content,null,l.a.createElement(D.a.Header,null,l.a.createElement(k.a,{to:"/mobs/"+e.vnum+"/"},"(",e.vnum,") ",e.name)),l.a.createElement(D.a.Description,null,e.short_description))))}),l.a.createElement("div",{id:"view-header-section"},l.a.createElement(M.a,{as:k.a,to:"/mobs/create",className:"view-create-new"},l.a.createElement(R.a,{name:"plus"}),"Create New")))),l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"mob-stats",className:"fade-in"},this.state.errors.length>0&&l.a.createElement(X.a,{negative:!0},l.a.createElement(X.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return l.a.createElement("p",null,e.message)})),l.a.createElement(H.a,{onSubmit:this.handleSubmit},l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(H.a.Input,{fluid:!0,name:"name",label:"Name",value:this.state.mob.name,placeholder:"name",onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"short_description",value:this.state.mob.short_description,label:"Short Desc",placeholder:"Short desc",onChange:this.handleChange})),l.a.createElement(H.a.Input,{fluid:!0,name:"long_description",label:"Long Desc",placeholder:"",value:this.state.mob.long_description,onChange:this.handleChange}),l.a.createElement(H.a.TextArea,{name:"description",label:"Look",placeholder:"The mob looks back at you!",value:this.state.mob.description,onChange:this.handleChange}),l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(H.a.Input,{fluid:!0,name:"alignment",label:"Alignment",placeholder:"0",value:this.state.mob.alignment,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"level",label:"Level",placeholder:"0",value:this.state.mob.level,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"exp_level",label:"EXP Level",placeholder:"0",value:this.state.mob.exp_level,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"gold",label:"Gold",placeholder:"0",value:this.state.mob.gold,onChange:this.handleChange}),l.a.createElement(H.a.Select,{fluid:!0,name:"sex",label:"Gender",options:this.state.genders,placeholder:"Gender",onChange:this.handleChange})),l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(H.a.Input,{fluid:!0,name:"hp",label:"HP",placeholder:"0",value:this.state.mob.hp,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"hitroll",label:"Hitroll",placeholder:"0",value:this.state.mob.hitroll,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"damroll",label:"Damroll",placeholder:"0",value:this.state.mob.damroll,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"ac",label:"Armor",placeholder:"0",value:this.state.mob.ac,onChange:this.handleChange})),l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(L.a,{label:"Affects",placeholder:"Affects",name:"affected_by",fluid:!0,multiple:!0,selection:!0,options:this.state.affects})),l.a.createElement(H.a.Button,{content:this.state.niceName}))))))))}}]),t}(l.a.Component);var P=Object(S.a)(Object(p.b)(function(e){return{}},function(e){return{}})(q));g()();function G(e){return function(t){t(function(e){return{type:"ACTIVE_AREA",areaId:e}}(e))}}var W=function(e){function t(e,a){var n;return Object(i.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e,a))).handleSubmit=function(){var e=Object(N.a)(Object(N.a)(n));if(""===n.state.area.name&&n.setState({errors:[{field:"name",message:"You must provide an area name."}]}),""===n.state.area.created_by&&n.setState({errors:[{field:"created_by",message:"You need to provide a name so we can credit the right person."}]}),n.state.errors.length>0)return!1;0===n.state.areaId?openDatabase(n.config.dbName,n.config.dbVersion,n.config.dbDescription,n.config.dbSize).transaction(function(t){t.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)",[e.state.name,e.state.created_by],function(t,a){e.props.history.push("/areas/"+a.insertId+"/")},function(e,t){console.log(t)})}):n.updateArea()},n.config=V,n.handleChange=n.handleChange.bind(Object(N.a)(Object(N.a)(n))),n.getAreas=n.getAreas.bind(Object(N.a)(Object(N.a)(n))),n.state={errors:[],niceName:"Create Area",areaId:0,name:"",created_by:"",areas:[{name:"My First Area",created_by:"Your Name Here",id:0}],area:{name:"",created_by:"",id:0}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"getAreas",value:function(){var e=openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize),t=this,a=[];e.transaction(function(e){e.executeSql("SELECT * FROM areas LIMIT 10000",[],function(e,n){if(console.log(n.rows),n.rows.length>=1)for(var o=0;o<n.rows.length;o++)console.log(n.rows[o]),a.push({id:n.rows[o].id,name:n.rows[o].name,created_by:n.rows[o].created_by});else a=[{id:0,name:"My First Area",created_by:"Your Name Here"}];t.setState({areas:a})})})}},{key:"componentDidMount",value:function(e){this.getAreas(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({areaId:this.props.match.params.areaId,niceName:"Update Area"}),this.getArea(this.props.match.params.areaId),console.log("Looking for new stuff")),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getAreas(),console.log("Will Recieve Fired"),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({areaId:this.props.match.params.areaId,niceName:"Update Area"}),this.getArea(this.props.match.params.areaId)),document.title=this.state.niceName}},{key:"getArea",value:function(e){var t=this;openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(a){a.executeSql("SELECT * FROM areas WHERE id = '"+e+"'",[],function(e,a){a.rows.length&&t.setState({area:{id:a.rows[0].id,name:a.rows[0].name,created_by:a.rows[0].created_by}})},function(e){console.log(e)})})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(function(e){return{area:Object(_.a)({},e.area,Object(O.a)({},a,n))}})}},{key:"createArea",value:function(){var e=this;openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(t){t.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)",[e.state.area.name,e.state.area.created_by],function(t,a){e.getAreas(),e.props.history.push("/areas/"+a.insertId+"/")},function(e,t){console.log(t)})})}},{key:"updateArea",value:function(){var e=this;openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(t){t.executeSql("UPDATE areas SET name = ?, created_by = ? WHERE rowid = ?",[e.state.area.name,e.state.area.created_by,e.state.areaId],function(t,a){e.getAreas()},function(e,t){console.log(t)})})}},{key:"setNewActiveArea",value:function(e){localStorage.setItem("selectedArea",e)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"wrap fade-in"},l.a.createElement(A.a,{placeholder:!0},l.a.createElement(w.a,{columns:2,stackable:!0,textAlign:"center"},l.a.createElement(C.a,{vertical:!0}),l.a.createElement(w.a.Row,{verticalAlign:"top"},l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"areas-list",className:"fade-in"},l.a.createElement(D.a,{divided:!0,relaxed:!0},this.state.areas.map(function(t){return l.a.createElement(D.a.Item,{key:"area-"+t.id},l.a.createElement(D.a.Content,null,l.a.createElement(D.a.Header,null,l.a.createElement(k.a,{to:"/areas/"+t.id+"/",onClick:function(){return e.setNewActiveArea(t.id)}},"(",t.id,") ",t.name)),l.a.createElement(D.a.Description,null,t.created_by)))})),l.a.createElement("div",{id:"view-header-section"},l.a.createElement(M.a,{as:k.a,to:"/areas/create",className:"view-create-new"},l.a.createElement(R.a,{name:"plus"}),"Create New")))),l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"mob-stats",className:"fade-in"},this.state.errors.length>0&&l.a.createElement(X.a,{negative:!0},l.a.createElement(X.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return l.a.createElement("p",null,e.message)})),l.a.createElement(H.a,{onSubmit:this.handleSubmit},l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(H.a.Input,{fluid:!0,name:"name",label:"Area Name",placeholder:"Area Name Here",value:this.state.area.name,onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"created_by",label:"Created By",placeholder:"Your Name Here",value:this.state.area.created_by,onChange:this.handleChange})),l.a.createElement(H.a.Button,{content:this.state.niceName}))))))))}}]),t}(l.a.Component);var B=Object(S.a)(Object(p.b)(function(e){return{}},function(e){return{actions:Object(E.b)(n,e)}})(W)),z=a(159),U=function(e){function t(e,a){var n;Object(i.a)(this,t),(n=Object(m.a)(this,Object(u.a)(t).call(this,e,a))).handleSubmit=function(){console.log(n.state.object);var e=[];n.setState({errors:e}),0===e.length&&(0===n.state.mobId?n.saveObject():n.updateObject())};var o=localStorage.getItem("selectedArea");return null===o&&(o=0),n.state={selectedArea:o,errors:[],mobId:0,niceName:"Create Mob",objects:[{vnum:0,name:"first mob areaname",short_description:"my first mob",long_description:"This is my first mob. Ain't it perty?"}],object:{vnum:0,name:"",short_description:"",description:"",item_type:0,extra_flags:[],wear_flags:[],value0:0,value1:0,value2:0,value3:0,weight:0,cost:0,affect_data:[],extra_descr_data:[],chpoweron:"",chpoweroff:"",chpoweruse:"",victpoweron:"",victpoweroff:"",victpoweruse:"",spectype:0,specpower:0},extra_flags:[{key:"1",text:"Glow",value:"1"},{key:"2",text:"Hum",value:"2"},{key:"4",text:"Throw",value:"4"},{key:"8",text:"Keep",value:"8"},{key:"16",text:"Vanish",value:"16"},{key:"32",text:"Invis",value:"32"},{key:"64",text:"Magic",value:"64"},{key:"128",text:"No Drop",value:"128"},{key:"256",text:"Bless",value:"256"},{key:"512",text:"Anti-Good",value:"512"},{key:"1024",text:"Anti-Evil",value:"1024"},{key:"2048",text:"Anti-Neutral",value:"2048"},{key:"4096",text:"No Remove",value:"4096"},{key:"8192",text:"Inventory",value:"8192"},{key:"16384",text:"Loyal",value:"16384"},{key:"32768",text:"Shadowplane",value:"32768"},{key:"65536",text:"Silver",value:"65536"},{key:"131072",text:"No Quest Card",value:"131072"},{key:"262144",text:"Quest Item",value:"262144"},{key:"524288",text:"Clan Iotem",value:"524288"},{key:"1048576",text:"Auto Claim",value:"1048576"},{key:"2097152",text:"Silent Vanish",value:"2097152"}],wear_flags:[{key:1,text:"Take",value:1},{key:2,text:"Finger",value:2},{key:4,text:"Neck",value:4},{key:8,text:"Body",value:8},{key:16,text:"Head",value:16},{key:32,text:"Legs",value:32},{key:64,text:"Feet",value:64},{key:128,text:"Hands",value:128},{key:256,text:"Arms",value:256},{key:512,text:"Shield",value:512},{key:1024,text:"About",value:1024},{key:2048,text:"Waist",value:2048},{key:4096,text:"Wrist",value:4096},{key:8192,text:"Wield",value:8192},{key:16384,text:"Hold",value:16384},{key:32768,text:"Wear Face",value:32768}],specials:[{key:1,text:"Activate",value:"1"},{key:2,text:"Twist",value:"2"},{key:4,text:"Press",value:"4"},{key:8,text:"Pull",value:"8"},{key:16,text:"Target",value:"16"},{key:32,text:"Spell",value:"32"},{key:64,text:"Transporter",value:"64"},{key:128,text:"Teleporter",value:"128"},{key:256,text:"Delay 1",value:"256"},{key:512,text:"Delay 2",value:"512"},{key:1024,text:"Object",value:"1024"},{key:2048,text:"Mobile",value:"2048"},{key:4096,text:"Action",value:"4096"},{key:8192,text:"Morph",value:"8192"}]},n.getObject=n.getObject.bind(Object(N.a)(Object(N.a)(n))),n.getObjects=n.getObjects.bind(Object(N.a)(Object(N.a)(n))),n.saveObject=n.saveObject.bind(Object(N.a)(Object(N.a)(n))),n.updateObject=n.updateObject.bind(Object(N.a)(Object(N.a)(n))),n.handleChange=n.handleChange.bind(Object(N.a)(Object(N.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(N.a)(Object(N.a)(n))),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getObjects(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({objectId:this.props.match.params.objectId,niceName:"Update Object"}),this.getObject(this.props.match.params.objectId)),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getObjects(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({objectId:this.props.match.params.objectId,niceName:"Update Object"}),this.getObject(this.props.match.params.objectId)),document.title=this.state.niceName}},{key:"getObjects",value:function(){var e=localStorage.getItem("objects");null!=e&&this.setState({objects:JSON.parse(e)||this.state.objects})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(function(e){return{object:Object(_.a)({},e.object,Object(O.a)({},a,n))}}),this.setState({unsaved:!0})}},{key:"getObject",value:function(e){console.log(e);var t=this,a={vnum:1,name:"",short_description:"",long_description:"",description:"",act:0,affected_by:0,alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0};openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(n){n.executeSql("SELECT * FROM objects WHERE area_id = '"+t.state.selectedArea+"' AND vnum = '"+e+"'",[],function(e,n){n.rows.length&&(a=n.rows[0],t.setState({object:a}))},function(e){console.log(e)})}),console.log(a)}},{key:"saveObject",value:function(){var e=this;console.log("Trying to save"),openDatabase(V.dbName,V.dbVersion,V.dbDescription,V.dbSize).transaction(function(t){t.executeSql("INSERT INTO objects (vnum, name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.state.mob.vnum,e.state.mob.name,e.state.mob.short_description,e.state.mob.long_description,e.state.mob.description,e.state.mob.act,e.state.mob.affected_by,e.state.mob.alignment,e.state.mob.level,e.state.mob.exp_level,e.state.mob.hitroll,e.state.mob.damroll,e.state.mob.ac,e.state.mob.hp,e.state.mob.gold,e.state.mob.sex,e.state.selectedArea],function(t,a){e.props.history.push("/objects/"+a.insertId+"/")},function(e){console.log(e)})})}},{key:"updateObject",value:function(){}},{key:"render",value:function(){return l.a.createElement("div",{className:"wrap fade-in"},l.a.createElement(A.a,{placeholder:!0},l.a.createElement(w.a,{columns:2,stackable:!0,textAlign:"center"},l.a.createElement(C.a,{vertical:!0}),l.a.createElement(w.a.Row,{verticalAlign:"top"},l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"objects-list",className:"fade-in"},this.state.objects.map(function(e){return l.a.createElement(D.a,{key:e.vnum,divided:!0,relaxed:!0},l.a.createElement(D.a.Item,null,l.a.createElement(D.a.Content,null,l.a.createElement(D.a.Header,null,l.a.createElement(k.a,{to:"/objects/"+e.vnum+"/"},"(",e.vnum,") ",e.name)),l.a.createElement(D.a.Description,null,e.short_description))))}),l.a.createElement("div",{id:"view-header-section"},l.a.createElement(M.a,{as:k.a,to:"/objects/create",className:"view-create-new"},l.a.createElement(R.a,{name:"plus"}),"Create New")))),l.a.createElement(w.a.Column,null,l.a.createElement("div",{id:"object-stats",className:"fade-in"},this.state.errors.length>0&&l.a.createElement(X.a,{negative:!0},l.a.createElement(X.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return l.a.createElement("p",null,e.message)})),l.a.createElement(H.a,{onSubmit:this.handleSubmit},l.a.createElement(H.a.Group,{widths:"equal"},l.a.createElement(H.a.Input,{fluid:!0,name:"name",label:"Name",value:this.state.object.name,placeholder:"name",onChange:this.handleChange}),l.a.createElement(H.a.Input,{fluid:!0,name:"short_description",value:this.state.object.short_description,label:"Short Desc",placeholder:"Short desc",onChange:this.handleChange})),l.a.createElement(H.a.Input,{fluid:!0,name:"long_description",label:"Long Desc",placeholder:"",value:this.state.object.long_description,onChange:this.handleChange}),l.a.createElement(H.a.TextArea,{name:"description",label:"Look",placeholder:"The mob looks back at you!",value:this.state.object.description,onChange:this.handleChange}),l.a.createElement(H.a.Group,null,l.a.createElement(z.a,null,"Extra Flags"),l.a.createElement(L.a,{label:"Extra Flags",name:"extra_flags",fluid:!0,multiple:!0,selection:!0,options:this.state.extra_flags})),l.a.createElement(H.a.Group,null,l.a.createElement(z.a,null,"Wear Flags"),l.a.createElement(L.a,{name:"wear_flags",fluid:!0,multiple:!0,selection:!0,options:this.state.wear_flags})),l.a.createElement(H.a.Group,null,l.a.createElement(z.a,null,"Specials"),l.a.createElement(L.a,{name:"specials",fluid:!0,multiple:!0,selection:!0,options:this.state.specials})),l.a.createElement(H.a.Button,{content:this.state.niceName}))))))))}}]),t}(l.a.Component);var Y=Object(S.a)(Object(p.b)(function(e){return{}},function(e){return{}})(U)),J=a(113),K={user:{isLoggedIn:!1,token:null,userId:null,firstName:null,lastName:null},area:0};var Q=Object(E.c)({areas:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0,a=Object.assign({},e);switch(t.type){case"areas":return a.areas=t.areas,console.log(a),a;case"ACTIVE_AREA":return a.activeArea=t.activeArea,a;default:return e}}});var $=function(e){var t=[J.a];return Object(E.e)(Q,e,Object(E.d)(E.a.apply(void 0,t)))},Z=($(),g()(),new(function(){function e(){Object(i.a)(this,e),this.config=V}return Object(c.a)(e,[{key:"getArea",value:function(e){openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(t){t.executeSql("SELECT * FROM areas WHERE rowid = '"+e+"'",[],function(e,t){console.log(t)})})}},{key:"createArea",value:function(e,t){}},{key:"event",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;this.sendMail(e,t,a,n)}},{key:"error",value:function(e,t,a){this.log("error",e,t,a)}},{key:"redirect",value:function(e){}},{key:"createDatabases",value:function(){openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY, name TEXT, created_by TEXT)"),e.executeSql("CREATE TABLE IF NOT EXISTS mobs (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, long_description TEXT, description TEXT, act TEXT, affected_by TEXT, alignment TEXT, level INT,  exp_level INT, hitroll INT, damroll INT, ac INT, hp INT, gold INT, sex INT, area_id INT)"),e.executeSql("CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, description TEXT, item_type INT, extra_flags TEXT, wear_flags TEXT, value0 INT, value1 INT, value2 INT, value3 INT, weight INT, cost INT, affect_data TEXT, extra_descr_data TEXT, chpoweron TEXT, chpoweroff TEXT, chpoweruse TEXT, victpoweron TEXT, victpoweroff TEXT, victpoweruse TEXT, spectype INT, specpower INT, area_id INT);")}),localStorage.setItem("database","1.1")}}]),e}())),ee=g()(),te=function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){"1.1"!==localStorage.getItem("dbVersion")&&Z.createDatabases()}},{key:"render",value:function(){return l.a.createElement("div",{className:"marcopromo-app-container"},l.a.createElement(h.a,{history:ee},l.a.createElement("div",{id:"",className:"content"},l.a.createElement(T,null),l.a.createElement("div",{id:"content_bin"},l.a.createElement(b.a,{exact:!0,path:"/areas/",niceName:"Areas",component:B}),l.a.createElement(b.a,{exact:!0,path:"/areas/:areaId/",niceName:"Areas",component:B}),l.a.createElement(b.a,{exact:!0,path:"/mobs/",niceName:"Mobs",component:P}),l.a.createElement(b.a,{exact:!0,path:"/mobs/:mobId/",niceName:"Edit Mob",component:P}),l.a.createElement(b.a,{exact:!0,path:"/objects/",nameName:"Create Object",component:Y})))))}}]),t}(o.Component);var ae=Object(p.b)(function(e){return e},function(e){return{actions:Object(E.b)(f,e)}})(te);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ne=$();r.a.render(l.a.createElement(p.a,{store:ne},l.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[192,2,1]]]);
//# sourceMappingURL=main.f21b0c03.chunk.js.map