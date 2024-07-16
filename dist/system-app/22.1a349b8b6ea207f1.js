"use strict";(self.webpackChunksystem_app=self.webpackChunksystem_app||[]).push([[22],{2022:(ie,F,u)=>{u.r(F),u.d(F,{HomeModule:()=>ne});var d=u(177),h=u(7679),c=u(4341),e=u(4438);let y=(()=>{class o{ngOnInit(){console.info("IndexComponent ngOnInit")}static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["app-index"]],decls:3,vars:0,template:function(i,n){1&i&&(e.j41(0,"h1"),e.EFF(1,"Index.component.html"),e.k0s(),e.nrm(2,"router-outlet"))},dependencies:[h.n3],encapsulation:2})}return o})();class P{constructor(){this.idPaciente=0,this.nombres="",this.primerApellido="",this.segundoApellido="",this.edad=0,this.edadCalculada=0,this.fechaNacimiento=new Date,this.sexo="",this.celular="",this.telefono="",this.email="",this.direccion="",this.createdAt=new Date,this.modifiedAt=new Date,this.consultas=[]}}var M=u(8032),p=u.n(M),m=u(1626);let C=(()=>{class o{constructor(t){this.http=t,this.urlEndPointPaciente="http://localhost:8081/system/apiv1/optica/paciente",this.urlEndPointConsulta="http://localhost:8081/system/apiv1/optica/consulta",this.httpHeaders=new m.Lr({"Content-Type":"application/json"})}getPacientesByString(t,i,n){const r=(new m.Nl).set("pageNumber",t.toString()).set("pageSize",i.toString()).set("string",n);return this.http.get(`${this.urlEndPointPaciente}`,{params:r,observe:"response"})}getPaciente(t){return this.http.get(`${this.urlEndPointPaciente}/${t}`,{observe:"response"})}crearPaciente(t){return this.http.post(this.urlEndPointPaciente,t,{observe:"response"})}putUpdatePaciente(t){return this.http.put(`${this.urlEndPointPaciente}`,t,{headers:this.httpHeaders,observe:"response"})}patchUpdatePaciente(t){return this.http.patch(`${this.urlEndPointPaciente}`,t,{headers:this.httpHeaders,observe:"response"})}eliminarPaciente(t){return this.http.delete(`${this.urlEndPointPaciente}/${t}`,{observe:"response"})}static#e=this.\u0275fac=function(i){return new(i||o)(e.KVO(m.Qq))};static#t=this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();function R(o,s){if(1&o){const t=e.RV6();e.j41(0,"button",29),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.crearpaciente())}),e.EFF(1,"Crear"),e.k0s()}}function I(o,s){if(1&o){const t=e.RV6();e.j41(0,"button",30),e.bIt("click",function(){e.eBV(t);const n=e.XpG();return e.Njj(n.actualizarpaciente())}),e.EFF(1,"Actualizar"),e.k0s()}}let k=(()=>{class o{constructor(t,i,n){this.pacienteService=t,this.router=i,this.activateRoute=n,this.paciente=new P}ngOnInit(){console.info("FormpacienteComponent ngOnInit()"),this.cargarpaciente()}cargarpaciente(){console.info("FormpacienteComponent cargarpaciente()"),this.activateRoute.params.subscribe(t=>{let i=t.idPaciente;i&&this.pacienteService.getPaciente(i).subscribe({next:n=>{null!==n.body?(this.paciente=n.body,console.info(this.paciente)):console.error("El cuerpo de la respuesta es nulo.")},error:n=>{p().fire("Mensaje: ",`${n.error.mensaje}`,"warning"),console.error("Error al obtener el paciente: ",n)},complete:()=>{console.log("Pacientes loaded")}})})}crearpaciente(){this.pacienteService.crearPaciente(this.paciente).subscribe(t=>{null!==t.body?(this.router.navigate(["/home/paciente"]),p().fire("Mensaje",`paciente: ${t.body.email} creado con \xe9xito!`,"success")):console.error("El cuerpo de la respuesta es nulo.")},t=>{this.router.navigate(["/home/paciente"]),p().fire("Mensaje",`${t.error.mensaje}`,"warning"),console.error("Error al crear el paciente: ",t)})}actualizarpaciente(){this.pacienteService.patchUpdatePaciente(this.paciente).subscribe({next:t=>{null!==t.body?(this.router.navigate(["/home/paciente"]),p().fire("El paciente",`El paciente ${t.body?.nombres} fue modificado con \xe9xito!`,"success")):console.error("El cuerpo de la respuesta es nulo.")},error:t=>{p().fire("Mensaje: ",`${t.error.mensaje}`,"warning"),console.error("Error al obtener el paciente: ",t)},complete:()=>{console.log("Pacientes loaded")}})}eliminarPaciente(){this.pacienteService.eliminarPaciente(this.paciente.idPaciente).subscribe(t=>{this.router.navigate(["/home/paciente"]),p().fire("El paciente",`El paciente ${t.body?.nombres} fue eliminado con \xe9xito!`,"success")})}static#e=this.\u0275fac=function(i){return new(i||o)(e.rXU(C),e.rXU(h.Ix),e.rXU(h.nX))};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["app-formpaciente"]],decls:77,vars:11,consts:[["formulario","ngForm"],["elseBlock",""],[1,"container-fluid"],[1,"col-sm-6"],["href","/home/paciente",1,"btn","btn-success"],[1,"fas","fa-home"],[1,"row","mb-2"],[1,"col-sm-12"],[1,"card","card-primary"],[1,"card-body"],[1,"row"],[1,"col-sm-4"],[1,"form-group"],["name","nombres","type","text","placeholder","Nombres","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],["name","primerApellido","type","text","placeholder","Primer Apellido","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],["name","segundoApellido","type","text","placeholder","Segundo Apellido","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],["name","celular","type","text","placeholder","Celular","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],["name","telefono","type","text","placeholder","Tel\xe9fono","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],["name","edad","type","text","placeholder","Edad","autocomplete","off",1,"form-control",3,"ngModelChange","ngModel"],[1,"form-group","input-group","mb-3"],[1,"custom-control","custom-radio","col-sm-12"],["type","radio","value","Mujer","id","customRadio1","name","sexo",1,"custom-control-input",3,"ngModelChange","ngModel"],["for","customRadio1",1,"custom-control-label"],["type","radio","value","Hombre","id","customRadio2","name","sexo",1,"custom-control-input",3,"ngModelChange","ngModel"],["for","customRadio2",1,"custom-control-label"],["name","direccion","rows","5","placeholder","Direcci\xf3n",1,"form-control",3,"ngModelChange","ngModel"],[1,"card-footer"],["type","submit","class","btn btn-success",3,"click",4,"ngIf","ngIfElse"],["type","submit",1,"btn","btn-danger",3,"click"],["type","submit",1,"btn","btn-success",3,"click"],["type","submit",1,"btn","btn-primary",3,"click"]],template:function(i,n){if(1&i){const r=e.RV6();e.j41(0,"h1"),e.EFF(1,"formpaciente.component.html"),e.k0s(),e.j41(2,"div",2)(3,"div",3)(4,"a",4),e.nrm(5,"i",5),e.EFF(6," Inicio"),e.k0s()(),e.j41(7,"div",6)(8,"div",7)(9,"h1"),e.EFF(10,"Datos Paciente"),e.k0s()()()(),e.j41(11,"div",8)(12,"form",null,0)(14,"div",9)(15,"div",10)(16,"div",11)(17,"div",12)(18,"label"),e.EFF(19,"Nombre:"),e.k0s(),e.j41(20,"input",13),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.nombres,a)||(n.paciente.nombres=a),e.Njj(a)}),e.k0s()()(),e.j41(21,"div",11)(22,"div",12)(23,"label"),e.EFF(24,"Primer Apellido:"),e.k0s(),e.j41(25,"input",14),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.primerApellido,a)||(n.paciente.primerApellido=a),e.Njj(a)}),e.k0s()()(),e.j41(26,"div",11)(27,"div",12)(28,"label"),e.EFF(29,"Segundo Apellido:"),e.k0s(),e.j41(30,"input",15),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.segundoApellido,a)||(n.paciente.segundoApellido=a),e.Njj(a)}),e.k0s()()()(),e.j41(31,"div",10)(32,"div",11)(33,"div",12)(34,"label"),e.EFF(35,"Celular:"),e.k0s(),e.j41(36,"input",16),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.celular,a)||(n.paciente.celular=a),e.Njj(a)}),e.k0s()()(),e.j41(37,"div",11)(38,"div",12)(39,"label"),e.EFF(40,"Telefono:"),e.k0s(),e.j41(41,"input",17),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.telefono,a)||(n.paciente.telefono=a),e.Njj(a)}),e.k0s()()(),e.j41(42,"div",11)(43,"div",12)(44,"label"),e.EFF(45,"Edad:"),e.k0s(),e.j41(46,"input",18),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.edad,a)||(n.paciente.edad=a),e.Njj(a)}),e.k0s()()()(),e.j41(47,"div",10)(48,"div",3)(49,"label"),e.EFF(50,"Sexo:"),e.k0s()(),e.j41(51,"div",10)(52,"div",7)(53,"div",19)(54,"div",20)(55,"input",21),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.sexo,a)||(n.paciente.sexo=a),e.Njj(a)}),e.k0s(),e.j41(56,"label",22),e.EFF(57,"Mujer"),e.k0s()(),e.j41(58,"div",20)(59,"input",23),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.sexo,a)||(n.paciente.sexo=a),e.Njj(a)}),e.k0s(),e.j41(60,"label",24),e.EFF(61,"Hombre"),e.k0s()()()()()(),e.j41(62,"div",10)(63,"div",7)(64,"div",12)(65,"label"),e.EFF(66,"Direcci\xf3n:"),e.k0s(),e.j41(67,"textarea",25),e.mxI("ngModelChange",function(a){return e.eBV(r),e.DH7(n.paciente.direccion,a)||(n.paciente.direccion=a),e.Njj(a)}),e.k0s()()()()(),e.j41(68,"div",26)(69,"div",10)(70,"div",3),e.DNE(71,R,2,0,"button",27)(72,I,2,0,"ng-template",null,1,e.C5r),e.k0s(),e.j41(74,"div",3)(75,"button",28),e.bIt("click",function(){return e.eBV(r),e.Njj(n.eliminarPaciente())}),e.EFF(76,"Eliminar"),e.k0s()()()()()()}if(2&i){const r=e.sdS(73);e.R7$(20),e.R50("ngModel",n.paciente.nombres),e.R7$(5),e.R50("ngModel",n.paciente.primerApellido),e.R7$(5),e.R50("ngModel",n.paciente.segundoApellido),e.R7$(6),e.R50("ngModel",n.paciente.celular),e.R7$(5),e.R50("ngModel",n.paciente.telefono),e.R7$(5),e.R50("ngModel",n.paciente.edad),e.R7$(9),e.R50("ngModel",n.paciente.sexo),e.R7$(4),e.R50("ngModel",n.paciente.sexo),e.R7$(8),e.R50("ngModel",n.paciente.direccion),e.R7$(4),e.Y8G("ngIf",!n.paciente.idPaciente)("ngIfElse",r)}},dependencies:[d.bT,c.qT,c.me,c.Fm,c.BC,c.cb,c.vS,c.cV],encapsulation:2})}return o})();var T=u(8359);class S extends T.yU{constructor(s,t){super()}schedule(s,t=0){return this}}const f={setInterval(o,s,...t){const{delegate:i}=f;return i?.setInterval?i.setInterval(o,s,...t):setInterval(o,s,...t)},clearInterval(o){const{delegate:s}=f;return(s?.clearInterval||clearInterval)(o)},delegate:void 0};var w=u(7908);const v={now:()=>(v.delegate||Date).now(),delegate:void 0};class b{constructor(s,t=b.now){this.schedulerActionCtor=s,this.now=t}schedule(s,t=0,i){return new this.schedulerActionCtor(this,s).schedule(i,t)}}b.now=v.now;const A=new class N extends b{constructor(s,t=b.now){super(s,t),this.actions=[],this._active=!1}flush(s){const{actions:t}=this;if(this._active)return void t.push(s);let i;this._active=!0;do{if(i=s.execute(s.state,s.delay))break}while(s=t.shift());if(this._active=!1,i){for(;s=t.shift();)s.unsubscribe();throw i}}}(class $ extends S{constructor(s,t){super(s,t),this.scheduler=s,this.work=t,this.pending=!1}schedule(s,t=0){var i;if(this.closed)return this;this.state=s;const n=this.id,r=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(r,n,t)),this.pending=!0,this.delay=t,this.id=null!==(i=this.id)&&void 0!==i?i:this.requestAsyncId(r,this.id,t),this}requestAsyncId(s,t,i=0){return f.setInterval(s.flush.bind(s,this),i)}recycleAsyncId(s,t,i=0){if(null!=i&&this.delay===i&&!1===this.pending)return t;null!=t&&f.clearInterval(t)}execute(s,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const i=this._execute(s,t);if(i)return i;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(s,t){let n,i=!1;try{this.work(s)}catch(r){i=!0,n=r||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),n}unsubscribe(){if(!this.closed){const{id:s,scheduler:t}=this,{actions:i}=t;this.work=this.state=this.scheduler=null,this.pending=!1,(0,w.o)(i,this),null!=s&&(this.id=this.recycleAsyncId(t,s,null)),this.delay=null,super.unsubscribe()}}});var E=u(9974),j=u(4360),D=u(3669);function O(o,s){return o===s}var G=u(5558);const L=()=>["/home/paciente/form"],H=o=>["/home/consulta/",o],x=o=>["/home/paciente/form",o];function Y(o,s){if(1&o){const t=e.RV6();e.j41(0,"tr")(1,"th"),e.EFF(2),e.k0s(),e.j41(3,"th"),e.EFF(4),e.k0s(),e.j41(5,"th"),e.EFF(6),e.k0s(),e.j41(7,"th"),e.EFF(8),e.k0s(),e.j41(9,"th"),e.EFF(10),e.k0s(),e.j41(11,"th"),e.EFF(12),e.k0s(),e.j41(13,"th")(14,"button",18),e.nrm(15,"i",19),e.EFF(16,"Expediente"),e.k0s()(),e.j41(17,"th")(18,"button",20),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG(2);return e.Njj(r.eliminarPaciente(n))}),e.nrm(19,"i",21),e.EFF(20,"Nuevo Ex\xe1men"),e.k0s()(),e.j41(21,"th")(22,"button",22),e.nrm(23,"i",23),e.EFF(24,"Editar"),e.k0s()()()}if(2&o){const t=s.$implicit;e.R7$(2),e.JRh(t.nombres),e.R7$(2),e.JRh(t.primerApellido),e.R7$(2),e.JRh(t.segundoApellido),e.R7$(2),e.JRh(t.celular),e.R7$(2),e.JRh(t.direccion),e.R7$(2),e.JRh(t.edadCalculada),e.R7$(2),e.Y8G("routerLink",e.eq3(8,H,t.idPaciente)),e.R7$(8),e.Y8G("routerLink",e.eq3(10,x,t.idPaciente))}}function U(o,s){if(1&o&&(e.j41(0,"table",15)(1,"thead")(2,"tr")(3,"th"),e.EFF(4,"Nombres"),e.k0s(),e.j41(5,"th"),e.EFF(6,"Primer Apellido"),e.k0s(),e.j41(7,"th"),e.EFF(8,"Segundo Apellido"),e.k0s(),e.j41(9,"th"),e.EFF(10,"Celular"),e.k0s(),e.j41(11,"th"),e.EFF(12,"Direccion"),e.k0s(),e.j41(13,"th"),e.EFF(14,"Edad Calculada"),e.k0s(),e.j41(15,"th"),e.EFF(16,"Expediente"),e.k0s(),e.j41(17,"th"),e.EFF(18,"Nuevo Ex\xe1men"),e.k0s(),e.j41(19,"th"),e.EFF(20,"Editar"),e.k0s()()(),e.j41(21,"tbody",16),e.DNE(22,Y,25,12,"tr",17),e.k0s()()),2&o){const t=e.XpG();e.R7$(22),e.Y8G("ngForOf",t.pacientes)}}let z=(()=>{class o{constructor(t){this.pacienteService=t,this.pacientes=[],this.currentPage=0,this.pageSize=10,this.searchControl=new c.MJ}ngOnInit(){console.info("PacienteComponent ngOnInit()"),this.searchControl.valueChanges.pipe(function B(o,s=A){return(0,E.N)((t,i)=>{let n=null,r=null,l=null;const a=()=>{if(n){n.unsubscribe(),n=null;const g=r;r=null,i.next(g)}};function oe(){const g=l+o,_=s.now();if(_<g)return n=this.schedule(void 0,g-_),void i.add(n);a()}t.subscribe((0,j._)(i,g=>{r=g,l=s.now(),n||(n=s.schedule(oe,o),i.add(n))},()=>{a(),i.complete()},void 0,()=>{r=n=null}))})}(1e3),function V(o,s=D.D){return o=o??O,(0,E.N)((t,i)=>{let n,r=!0;t.subscribe((0,j._)(i,l=>{const a=s(l);(r||!o(n,a))&&(r=!1,n=a,i.next(l))}))})}(),(0,G.n)(t=>this.pacienteService.getPacientesByString(this.currentPage,this.pageSize,t))).subscribe({next:t=>{t?(this.page=t.body,this.pacientes=t.body?.content??[]):(console.error("No data in response"),this.pacientes=[])},error:t=>{p().fire("Mensaje: ",`${t.error.mensaje}`,"warning"),console.error("Error al obtener los pacientes: ",t)},complete:()=>{console.log("Pacientes loaded")}}),this.loadPacientes()}loadPacientes(){this.pacienteService.getPacientesByString(this.currentPage,this.pageSize,"").subscribe({next:t=>{t?(this.page=t.body,this.pacientes=t.body?.content??[]):(p().fire("Sin datos","","warning"),console.error("No data in response"),this.pacientes=[])},error:t=>{p().fire("Error al cargar los datos",`${t.error.mensaje}`,"warning"),console.error("Error al obtener los pacientes: ",t)},complete:()=>{console.log("Pacientes loaded")}})}eliminarPaciente(t){const i=p().mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!1});i.fire({title:"\xbfEst\xe1s seguro?",text:`Estas seguro de eliminar al paciente ${t.nombres}`,icon:"warning",showCancelButton:!0,confirmButtonText:"S\xed, Eliminiar",cancelButtonText:"No, cancelar!",reverseButtons:!0}).then(n=>{n.isConfirmed&&this.pacienteService.eliminarPaciente(t.idPaciente).subscribe(r=>{this.pacientes=this.pacientes.filter(l=>l!=t),i.fire("Eliminado!",`Paciente ${r.body?.nombres} eliminado con \xe9xito`,"success")})})}onPageChange(t){this.currentPage=t,this.loadPacientes()}static#e=this.\u0275fac=function(i){return new(i||o)(e.rXU(C))};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["app-paciente"]],decls:27,vars:10,consts:[[1,"row"],[1,"card"],[1,"card-header"],[1,"navbar","bg-body-tertiary"],[1,"container-fluid"],["type","button",1,"btn","btn-rounded","btn-success","btn-lg",3,"routerLink"],[1,"fas","fa-user-plus"],["role","search",1,"d-flex"],["type","search","placeholder","Search","aria-label","Search",1,"form-control","me-2",3,"formControl"],["type","submit",1,"btn","btn-outline-success"],[1,"card-body"],[1,"table-responsive"],["class","table table-hover",4,"ngIf"],[1,"text-center"],[3,"click","disabled"],[1,"table","table-hover"],[1,"table-group-divider"],[4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-success","btn-lg",3,"routerLink"],[1,"fas","fa-search"],["type","submit",1,"btn","btn-primary","btn-lg",3,"click"],[1,"fas","fa-book-medical"],["type","submit",1,"btn","btn-warning","btn-lg",3,"routerLink"],[1,"fas","fa-user-edit"]],template:function(i,n){1&i&&(e.j41(0,"div",0)(1,"h1"),e.EFF(2,"Pacientes Registrados"),e.k0s(),e.j41(3,"div",1)(4,"div",2)(5,"nav",3)(6,"div",4)(7,"h1")(8,"button",5),e.nrm(9,"i",6),e.EFF(10,"Nuevo "),e.k0s()(),e.j41(11,"form",7),e.nrm(12,"input",8),e.j41(13,"button",9),e.EFF(14,"Search"),e.k0s()()()()(),e.j41(15,"div",10)(16,"div",11),e.DNE(17,U,23,1,"table",12),e.k0s(),e.j41(18,"div",13)(19,"p"),e.EFF(20),e.k0s(),e.j41(21,"button",14),e.bIt("click",function(){return n.onPageChange(n.currentPage-1)}),e.EFF(22,"Anterior"),e.k0s(),e.j41(23,"span"),e.EFF(24),e.k0s(),e.j41(25,"button",14),e.bIt("click",function(){return n.onPageChange(n.currentPage+1)}),e.EFF(26,"Siguiente"),e.k0s()()()()()),2&i&&(e.R7$(8),e.Y8G("routerLink",e.lJ4(9,L)),e.R7$(4),e.Y8G("formControl",n.searchControl),e.R7$(5),e.Y8G("ngIf",n.pacientes.length>0),e.R7$(3),e.Lme("Mostrando ",null==n.page?null:n.page.numberOfElements," de ",null==n.page?null:n.page.totalElements," pacientes"),e.R7$(),e.Y8G("disabled",0===n.currentPage),e.R7$(3),e.Lme("P\xe1gina ",n.currentPage+1," de ",null==n.page?null:n.page.totalPages,""),e.R7$(),e.Y8G("disabled",n.currentPage+1===(null==n.page?null:n.page.totalPages)))},dependencies:[d.Sq,d.bT,h.Wk,c.qT,c.me,c.BC,c.cb,c.l_,c.cV],encapsulation:2})}return o})(),J=(()=>{class o{constructor(t){this.http=t,this.urlEndPointConsulta="http://localhost:8081/system/apiv1/optica/consulta",this.httpHeaders=new m.Lr({"Content-Type":"application/json"})}getConsultas(t,i,n){const r=(new m.Nl).set("pageNumber",t.toString()).set("pageSize",i.toString()).set("idConsulta",n);return this.http.get(`${this.urlEndPointConsulta}`,{params:r,observe:"response"})}getConsultasByPaciente(t,i,n){return(new m.Nl).set("pageNumber",t.toString()).set("pageSize",i.toString()).set("idPaciente",n),this.http.get(`${this.urlEndPointConsulta}/${n}`,{observe:"response"})}getConsulta(t){return this.http.get(`${this.urlEndPointConsulta}/${t}`,{observe:"response"})}crearConsulta(t){return this.http.post(this.urlEndPointConsulta,t,{observe:"response"})}actualizarConsulta(t){return this.http.put(`${this.urlEndPointConsulta}`,t,{headers:this.httpHeaders,observe:"response"})}eliminarConsulta(t){return this.http.delete(`${this.urlEndPointConsulta}/${t}`,{observe:"response"})}static#e=this.\u0275fac=function(i){return new(i||o)(e.KVO(m.Qq))};static#t=this.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();const X=()=>["/home/consulta/form"],K=o=>["/home/consulta/",o],W=o=>["/home/paciente/form",o];function q(o,s){if(1&o){const t=e.RV6();e.j41(0,"tr")(1,"th"),e.EFF(2),e.nI1(3,"date"),e.k0s(),e.j41(4,"th"),e.EFF(5),e.k0s(),e.j41(6,"th"),e.EFF(7),e.k0s(),e.j41(8,"th")(9,"button",17),e.nrm(10,"i",18),e.EFF(11,"Expediente"),e.k0s()(),e.j41(12,"th")(13,"button",19),e.bIt("click",function(){const n=e.eBV(t).$implicit,r=e.XpG(2);return e.Njj(r.eliminarConsulta(n))}),e.nrm(14,"i",20),e.EFF(15,"Nuevo Ex\xe1men"),e.k0s()(),e.j41(16,"th")(17,"button",21),e.nrm(18,"i",22),e.EFF(19,"Editar"),e.k0s()()()}if(2&o){const t=s.$implicit;e.R7$(2),e.JRh(e.i5U(3,5,t.createdAt,"dd-MMMM-yyyy")),e.R7$(3),e.JRh(t.subLejDer),e.R7$(2),e.JRh(t.subLejIzq),e.R7$(2),e.Y8G("routerLink",e.eq3(8,K,t.idConsulta)),e.R7$(8),e.Y8G("routerLink",e.eq3(10,W,t.idConsulta))}}function Q(o,s){if(1&o&&(e.j41(0,"table",14)(1,"thead")(2,"tr")(3,"th"),e.EFF(4,"FechaCreacion"),e.k0s(),e.j41(5,"th"),e.EFF(6,"SubjetivoLejosDerecho"),e.k0s(),e.j41(7,"th"),e.EFF(8,"SubjetivoLejosIzquierdo"),e.k0s(),e.j41(9,"th"),e.EFF(10,"Ver"),e.k0s(),e.j41(11,"th"),e.EFF(12,"Editar"),e.k0s()()(),e.j41(13,"tbody",15),e.DNE(14,q,20,12,"tr",16),e.k0s()()),2&o){const t=e.XpG();e.R7$(14),e.Y8G("ngForOf",t.consultas)}}function ee(o,s){if(1&o&&(e.j41(0,"div")(1,"p"),e.EFF(2),e.k0s()()),2&o){const t=s.$implicit;e.R7$(2),e.Lme("",t.name," - ",t.price,"")}}const te=[{path:"",component:y,children:[{path:"",redirectTo:"paciente",pathMatch:"full"},{path:"paciente",component:z},{path:"paciente/form",component:k},{path:"paciente/form/:idPaciente",component:k},{path:"consulta",component:(()=>{class o{constructor(t){this.consultaService=t,this.consultas=[],this.currentPage=0,this.pageSize=3,this.searchControl=new c.MJ}ngOnInit(){this.loadConsultas()}loadConsultas(){console.info("UsersComponent ngOnInit()"),this.consultaService.getConsultas(this.currentPage,this.pageSize,0).subscribe({next:t=>{t?(this.page=t.body,this.consultas=t.body?.content??[]):(console.error("No data in response"),this.consultas=[])},error:t=>{p().fire("Mensaje: ",`${t.error.mensaje}`,"warning"),console.error("Error al obtener los pacientes: ",t)},complete:()=>{console.log("Pacientes loaded")}})}eliminarConsulta(t){throw new Error("Method not implemented.")}onPageChange(t){this.currentPage=t,this.loadConsultas()}static#e=this.\u0275fac=function(i){return new(i||o)(e.rXU(J))};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["app-consulta"]],decls:24,vars:8,consts:[[1,"row"],[1,"card"],[1,"card-header"],[1,"navbar","bg-body-tertiary"],[1,"container-fluid"],["type","button",1,"btn","btn-rounded","btn-success","btn-lg",3,"routerLink"],[1,"fas","fa-user-plus"],["role","search",1,"d-flex"],["type","search","placeholder","Search","aria-label","Search",1,"form-control","me-2",3,"formControl"],["type","submit",1,"btn","btn-outline-success"],[1,"card-body","table-responsive"],["class","table table-hover",4,"ngIf"],[1,"text-center"],[3,"click","disabled"],[1,"table","table-hover"],[1,"table-group-divider"],[4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-success","btn-lg",3,"routerLink"],[1,"fas","fa-search"],["type","submit",1,"btn","btn-primary","btn-lg",3,"click"],[1,"fas","fa-book-medical"],["type","submit",1,"btn","btn-warning","btn-lg",3,"routerLink"],[1,"fas","fa-user-edit"]],template:function(i,n){1&i&&(e.j41(0,"div",0)(1,"h1"),e.EFF(2,"Consultas Registrados"),e.k0s(),e.j41(3,"div",1)(4,"div",2)(5,"nav",3)(6,"div",4)(7,"h1")(8,"button",5),e.nrm(9,"i",6),e.EFF(10,"Nuevo "),e.k0s()(),e.j41(11,"form",7),e.nrm(12,"input",8),e.j41(13,"button",9),e.EFF(14,"Search"),e.k0s()()()()(),e.j41(15,"div",10),e.DNE(16,Q,15,1,"table",11),e.j41(17,"div",12)(18,"button",13),e.bIt("click",function(){return n.onPageChange(n.currentPage-1)}),e.EFF(19,"Anterior"),e.k0s(),e.j41(20,"span"),e.EFF(21),e.k0s(),e.j41(22,"button",13),e.bIt("click",function(){return n.onPageChange(n.currentPage+1)}),e.EFF(23,"Siguiente"),e.k0s()()()()()),2&i&&(e.R7$(8),e.Y8G("routerLink",e.lJ4(7,X)),e.R7$(4),e.Y8G("formControl",n.searchControl),e.R7$(4),e.Y8G("ngIf",n.consultas.length>0),e.R7$(2),e.Y8G("disabled",0===n.currentPage),e.R7$(3),e.Lme("P\xe1gina ",n.currentPage+1," de ",null==n.page?null:n.page.totalPages,""),e.R7$(),e.Y8G("disabled",n.currentPage+1===(null==n.page?null:n.page.totalPages)))},dependencies:[d.Sq,d.bT,h.Wk,c.qT,c.me,c.BC,c.cb,c.l_,c.cV,d.vh],encapsulation:2})}return o})()},{path:"ticket",component:(()=>{class o{constructor(){this.currentDate=new Date,this.customerName="John Doe",this.items=[{name:"Producto 1",price:50},{name:"Producto 2",price:30},{name:"Producto 3",price:20}],this.total=this.items.reduce((t,i)=>t+i.price,0)}ngOnInit(){console.info("TicketComponent ngOnInit()")}printTicket(){const t=document.getElementById("ticket").innerHTML,i=document.body.innerHTML;document.body.innerHTML=t,window.print(),document.body.innerHTML=i,window.location.reload()}static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275cmp=e.VBU({type:o,selectors:[["app-ticket"]],decls:28,vars:4,consts:[["id","ticket"],[4,"ngFor","ngForOf"],[3,"click"]],template:function(i,n){1&i&&(e.j41(0,"div",0)(1,"h2"),e.EFF(2,"Nombre del Comercio"),e.k0s(),e.j41(3,"p"),e.EFF(4,"Direcci\xf3n del Comercio"),e.k0s(),e.j41(5,"p"),e.EFF(6,"Tel\xe9fono del Comercio"),e.k0s(),e.nrm(7,"hr"),e.j41(8,"p")(9,"strong"),e.EFF(10,"Fecha:"),e.k0s(),e.EFF(11),e.k0s(),e.j41(12,"p")(13,"strong"),e.EFF(14,"Cliente:"),e.k0s(),e.EFF(15),e.k0s(),e.nrm(16,"hr"),e.DNE(17,ee,3,2,"div",1),e.nrm(18,"hr"),e.j41(19,"p")(20,"strong"),e.EFF(21,"Total:"),e.k0s(),e.EFF(22),e.k0s(),e.nrm(23,"hr"),e.j41(24,"p"),e.EFF(25,"\xa1Gracias por su compra!"),e.k0s()(),e.j41(26,"button",2),e.bIt("click",function(){return n.printTicket()}),e.EFF(27,"Imprimir Ticket"),e.k0s()),2&i&&(e.R7$(11),e.SpI(" ",n.currentDate,""),e.R7$(4),e.SpI(" ",n.customerName,""),e.R7$(2),e.Y8G("ngForOf",n.items),e.R7$(5),e.SpI(" ",n.total,""))},dependencies:[d.Sq],styles:["#ticket[_ngcontent-%COMP%]{width:300px;margin:0 auto;padding:10px;border:1px solid #000;font-family:Arial,sans-serif}@media print{body[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{visibility:hidden}#ticket[_ngcontent-%COMP%], #ticket[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{visibility:visible}#ticket[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;margin:0;padding:0;border:none}button[_ngcontent-%COMP%]{display:none}}"]})}return o})()}]}];let ne=(()=>{class o{static#e=this.\u0275fac=function(i){return new(i||o)};static#t=this.\u0275mod=e.$C({type:o});static#n=this.\u0275inj=e.G2t({imports:[d.MD,h.iI.forChild(te),c.X1,c.YN,h.iI]})}return o})()}}]);