import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { ModalController,ToastController} from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
data:String;
HttpClient: any;
headers: HttpHeaders;
server: string = "http://localhost/project/getdata.php";
//server: string = "https://ae63-2405-9800-bc20-a8-84a4-db6c-f514-fe66.ngrok.io/project/getdata.php";
serverx: String = "http://localhost/";
//serverx: String = "https://ae63-2405-9800-bc20-a8-84a4-db6c-f514-fe66.ngrok.io";
ctemp: any;
ftemp: any;
w_light: String;
level: String;
feed:String;
pump:String;
food: String;
quality:String;
light_task:String;
auto_status:String;
x :String;
timeout:number;
timeout2:number; 
autotimefeed:String;
intnum : number;
foodlist:any;
mode_light: any;
foodvol: any;
modelist:any;
color_list:any;
bg:String;
ban:String; 
font:String; 
fontbtn:String; 
mode:String;
localmode:String;
on_off:String ;
btn1:String;
btn2:String;
icontheme1:String='assets/imgs/sunny-outline.png'; //theme button
icontheme2:String='assets/imgs/moon-outline.svg'; //theme button
icontheme:String;
  autoset:String;
  get_atemp:String;
  get_afeed_hh:String;
  get_afeed_mm:String;
  get_time:String;
  get_avol:String;
  getdate:String;
  timepick:String;
  color_set:String;
  color_mix: number[] = [0, 0, 0];
  r_light: any;
  g_light: any;
  b_light: any;
  rhex: String;
  ghex: String;
  bhex: String;
  getr : any;
  getg : any;
  getb : any;
  gettask : String;
  getmode : String;
 flow: String;
readdata:String;
datalist:String[];
servoauto_check:String;
noti_x:String;
inttemp : any;
begintemp:String;
stacktemp:any;
  constructor(public navCtrl: NavController,
    public http: HttpClient,
    public toastController: ToastController,
    public modalController: ModalController,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode
    ) {
      this.backgroundMode.isEnabled();
      this.headers = new HttpHeaders();
      this.headers.append("Accept",'application/json');
      this.headers.append('Content-Type','application/json');
      this.headers.append('Access-Control-Allow_Origin','*');
      this.http.get(this.server).subscribe((res:any)=>{
        console.log("success");
        this.data = res;
        this.mode = this.data[11]['data1'];
        this.getdate = this.data[13]['data1'];
        this.r_light = this.data[7]['data1'];
        this.g_light = this.data[8]['data1'];
        this.b_light = this.data[9]['data1'];
        this.getr = this.data[7]['data1'];
        this.getg = this.data[8]['data1'];
        this.getb = this.data[9]['data1'];
        this.theme()
        this.sum()
        console.log(this.mode);
        },(error:any)=>{
        console.log("error");
        })
      this.get();
  }
  get(){
    this.http.get(this.server).subscribe((res:any)=>{
  console.log("success");
  this.readdata= this.data[24]['data1'];
  this.datalist=this.readdata.split(',');
  this.begintemp = this.datalist[0];
if(this.begintemp != "-127.00"){
  this.stack();
  this.stacktemp = this.data[0]['data1'];
  this.ctemp = this.datalist[0];
}else{
  this.ctemp= this.data[0]['data1'] ;
}
  this.ftemp = (1.8*this.ctemp+32).toFixed(2);
  this.level = this.datalist[1];
  this.pump = this.datalist[3];
  this.data = res;
  this.quality = this.data[2]['data1'];
  this.feed = this.data[3]['data1'];
  this.w_light = this.data[6]['data1'];
  this.on_off = this.data[12]['data1'];
  this.mode_light=this.data[10]['data1'];
  this.light_task=this.data[17]['data1'];
  this.servoauto_check=this.data[16]['data1'];
  this.autotimefeed = this.data[14]['data1'];
    if(this.pump=="Stop"){
      this.flow =" ";
    }else{
      this.flow = "( "+this.datalist[4]+" L/minute )";
    }
  this.checksublight()
  this.showauto()
  this.autocheck()
  console.log(this.data);
  },(error:any)=>{
  console.log("error");
  })
  if(this.pump =="Stop"){
    this.localNotifications.schedule({
      id: 1,
      text: 'Pump Stop Working',
      icon:'file://assetts/imgs/icon.png'
    });
    console.log("Pump Stop");
  }
  this.inttemp = this.ctemp;
if(this.inttemp < 23){
  this.localNotifications.schedule({
    id: 2,
    text: 'Low Temperature',
    icon: 'file://assetts/imgs/icon.png '
  });
}
if(this.level == "danger"){
  this.localNotifications.schedule({
    id: 3,
    text: 'Low Water',
    icon:'file://assetts/imgs/icon.png '
  });
  console.log("Low water");
}
  setTimeout(() => {
    this.get2();
    }, 5000);
  }
  get2(){
    this.http.get(this.server).subscribe((res:any)=>{
  console.log("success");
  this.readdata= this.data[24]['data1'];
  this.datalist=this.readdata.split(',');
  this.begintemp = this.datalist[0];
if(this.begintemp != "-127.00"){
  this.stack();
  this.stacktemp = this.data[0]['data1'];
  this.ctemp = this.datalist[0];
}else{
  this.ctemp= this.data[0]['data1'] ;
}
  this.ftemp = (1.8*this.ctemp+32).toFixed(2);
  this.level = this.datalist[1];
  this.pump = this.datalist[3];
  this.data = res;
  this.quality = this.data[2]['data1'];
  this.feed = this.data[3]['data1'];
  this.w_light = this.data[6]['data1'];
  console.log(this.data);
  },(error:any)=>{
  console.log("error");
  })
  setTimeout(() => {
    this.get();
    }, 5000);
    
  }
  get3(){
    this.http.get(this.server).subscribe((res:any)=>{
  console.log("success");
  this.r_light = this.data[7]['data1'];
  this.g_light = this.data[8]['data1'];
  this.b_light = this.data[9]['data1'];

  this.getr = this.data[7]['data1'];
  this.getg = this.data[8]['data1'];
  this.getb = this.data[9]['data1'];
  console.log(this.data);
  },(error:any)=>{
  console.log("error");
  })
  }
getx(){
  this.http.get(this.server).subscribe((res:any)=>{
    console.log("success");
    this.data = res;
    this.mode = this.data[11]['data1'];
    this.getdate = this.data[13]['data1'];
    this.r_light = this.data[7]['data1'];
    this.g_light = this.data[8]['data1'];
    this.b_light = this.data[9]['data1'];
    this.getr = this.data[7]['data1'];
    this.getg = this.data[8]['data1'];
    this.getb = this.data[9]['data1'];
    this.theme()
    this.sum()
    console.log(this.mode);
    },(error:any)=>{
    console.log("error");
    })
}
  showauto(){
    if( this.on_off ==="true"){
      this.onoff1()
      this.autoset='false';
      this.auto_status = this.getdate ;
      if (this.intnum<0){
        this.autocheck()
      }
    }
    if( this.on_off ==="false"){
      this.onoff2()
      this.autoset='true'
      this.auto_status ="OFF";
    }
    if( this.servoauto_check ==="0"){
      this.onoff2()
      this.autoset='true'
      this.auto_status ="OFF";
    }
  }
  onoff1(){
this.btn1="secondary";
this.btn2="btn2";
this.timepick ="false";
  let data =  {
    id: 13,
    data1: "true"
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  let data2 =  {
    id: 14,
    data1: this.getdate
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data2),)
  .subscribe(data2 => {
  console.log(data2);
  }, error => {
  console.log(error);
  });
  let data3 =  {
    id: 17,
    data1: "1"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(data3),)
.subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
});
this.checktime();
  }
  onoff2(){
    this.btn1="btn1";
    this.btn2="danger";
    this.timepick ="true";
    let data =  {
      id: 13,
      data1: "false"
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
  .subscribe(data => {
    console.log(data);
   }, error => {
    console.log(error);
  });
  let data3 =  {
    id: 17,
    data1: "0"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(data3),)
.subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
});
  }
  theme(){
    if (this.mode ==="dark"){
      this.icontheme = this.icontheme1;
      this.bg ='bg01'
      this.ban ='ban1';
      this.font ='light';
      this.fontbtn ='dark';
      this.localmode = "dark";
    }
    if( this.mode ==="light"){
      this.icontheme = this.icontheme2;
      this.bg ='bg02';
      this.ban ='ban2';
      this.font ='dark';
      this.fontbtn ='light';
      this.localmode = "light";
    }
  }
themechange(){
  if (this.localmode ==="dark"){
    this.icontheme = this.icontheme2;
    this.bg ='bg02';
    this.ban ='ban2';
    this.font ='dark';
    this.fontbtn ='light';
     this.x ="light"; 
     let data =  {
      id: 12,
      data1: "light"
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
    .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
    });
  }
  if( this.localmode ==="light"){
    this.icontheme = this.icontheme1;
    this.bg ='bg01'
    this.ban ='ban1';
    this.font ='light';
    this.fontbtn ='dark';
     this.x ="dark"; 
     let data =  {
      id: 12,
      data1: "dark"
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
    .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
    });
  }
  this.localmode =  this.x;
}
  pushlightoff(){
    console.log('ปิด');
    let data =  {
      id: 7,
      data1: "false"
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
  let data2 =  {
    id: 18,
    data1: "OFF"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(data2),)
.subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
});
let datargb1 =  {
  id: 19,
  data1: "0"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb1),)
.subscribe(data => {
console.log(data);
}, error => {
console.log(error);
});
let datargb2 =  {
id: 20,
data1: "0"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb2),)
.subscribe(data => {
console.log(data);
}, error => {
console.log(error);
});
let datargb3 =  {
id: 21,
data1: "0"
}
this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb3),)
.subscribe(data => {
console.log(data);
}, error => {
console.log(error);
});
  }
  pushlighton(){
    let data =  {
      id: 7,
      data1: "checked"
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
    .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
    });
    let data2 =  {
      id: 18,
      data1: "ON"
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data2),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
  }  
    ngOnInit() {
      this.color_list =[
        {id:1,  name: "color_pick_18",  value:"#ff0000"},
        {id:2,  name: "color_pick_17",  value:"#f9350f"},
        {id:3,  name: "color_pick_16",  value:"#fa710f"},
        {id:4,  name: "color_pick_15",  value:"#faac0f"},
        {id:5,  name: "color_pick_14",  value:"#fad30f"},
        {id:6,  name: "color_pick_13",  value:"#fafa0f"},
        {id:7,  name: "color_pick_12",  value:"#0f84fa"},
        {id:8,  name: "color_pick_11",  value:"#0fb0fa"},
        {id:9,  name: "color_pick_10",  value:"#0ffad3"},
        {id:10, name: "color_pick_9",   value:"#0ffa84"},
        {id:11, name: "color_pick_8",   value:"#0ffa36"},
        {id:12, name: "color_pick_7",   value:"#84fa0f"},
        {id:13, name: "color_pick_6",   value:"#0f36fa"},
        {id:14, name: "color_pick_5",   value:"#710ffa"},
        {id:15, name: "color_pick_4",   value:"#bf0ffa"},
        {id:16, name: "color_pick_3",   value:"#fa0fc6"},
        {id:17, name: "color_pick_2",   value:"#fa0f84"},
        {id:18, name: "color_pick_1",   value:"#ffffff"},
      ]
    }
    color18(){
      this.color_set=this.color_list[0]['value'];
      this.r_light='255'
      this.g_light='0'
      this.b_light='0'
      this.color_mix[0]=255
      this.color_mix[1]=0
      this.color_mix[2]=0
    }
    color17(){
      this.color_set=this.color_list[1]['value'];
      this.r_light='249'
      this.g_light='53'
      this.b_light='15'
      this.color_mix[0]=249
      this.color_mix[1]=53
      this.color_mix[2]=15
    }
    color16(){
      this.color_set=this.color_list[2]['value'];
      this.r_light='250'
      this.g_light='113'
      this.b_light='15'
      this.color_mix[0]=250
      this.color_mix[1]=113
      this.color_mix[2]=15
    }
    color15(){
      this.color_set=this.color_list[3]['value'];
      this.r_light='250'
      this.g_light='172'
      this.b_light='15'
      this.color_mix[0]=250
      this.color_mix[1]=172
      this.color_mix[2]=15
    }
    color14(){
      this.color_set=this.color_list[4]['value'];
      this.r_light='250'
      this.g_light='211'
      this.b_light='15'
      this.color_mix[0]=250
      this.color_mix[1]=211
      this.color_mix[2]=15
    }
    color13(){
      this.color_set=this.color_list[5]['value'];
      this.r_light='250'
      this.g_light='250'
      this.b_light='15'
      this.color_mix[0]=250
      this.color_mix[1]=250
      this.color_mix[2]=15
    }
    color12(){
      this.color_set=this.color_list[6]['value'];
      this.r_light='15'
      this.g_light='132'
      this.b_light='250'
      this.color_mix[0]=15
      this.color_mix[1]=132
      this.color_mix[2]=250
    }
    color11(){
      this.color_set=this.color_list[7]['value'];
      this.r_light='15'
      this.g_light='176'
      this.b_light='250'
      this.color_mix[0]=15
      this.color_mix[1]=176
      this.color_mix[2]=250
    }
    color10(){
      this.color_set=this.color_list[8]['value'];
      this.r_light='15'
      this.g_light='250'
      this.b_light='211'
      this.color_mix[0]=15
      this.color_mix[1]=250
      this.color_mix[2]=211
    }
    color9(){
      this.color_set=this.color_list[9]['value'];
      this.r_light='15'
      this.g_light='250'
      this.b_light='132'
      this.color_mix[0]=15
      this.color_mix[1]=250
      this.color_mix[2]=132
    }
    color8(){
      this.color_set=this.color_list[10]['value'];
      this.r_light='15'
      this.g_light='250'
      this.b_light='54'
      this.color_mix[0]=15
      this.color_mix[1]=250
      this.color_mix[2]=54
    }
    color7(){
      this.color_set=this.color_list[11]['value'];
      this.r_light='132'
      this.g_light='250'
      this.b_light='15'
      this.color_mix[0]=132
      this.color_mix[1]=250
      this.color_mix[2]=15
    }
    color6(){
      this.color_set=this.color_list[12]['value'];
      this.r_light='15'
      this.g_light='54'
      this.b_light='250'
      this.color_mix[0]=15
      this.color_mix[1]=54
      this.color_mix[2]=250
    }
    color5(){
      this.color_set=this.color_list[13]['value'];
      this.r_light='113'
      this.g_light='15'
      this.b_light='250'
      this.color_mix[0]=113
      this.color_mix[1]=15
      this.color_mix[2]=250
    }
    color4(){
      this.color_set=this.color_list[14]['value'];
      this.r_light='191'
      this.g_light='15'
      this.b_light='250'
      this.color_mix[0]=191
      this.color_mix[1]=15
      this.color_mix[2]=250
    }
    color3(){
      this.color_set=this.color_list[15]['value'];
      this.r_light='250'
      this.g_light='15'
      this.b_light='198'
      this.color_mix[0]=250
      this.color_mix[1]=15
      this.color_mix[2]=198
    }
    color2(){
      this.color_set=this.color_list[16]['value'];
      this.r_light='250'
      this.g_light='15'
      this.b_light='132'
      this.color_mix[0]=250
      this.color_mix[1]=15
      this.color_mix[2]=132
    }
    color1(){
      this.color_set=this.color_list[17]['value'];
      this.r_light='255'
      this.g_light='255'
      this.b_light='255'
      this.color_mix[0]=255
      this.color_mix[1]=255
      this.color_mix[2]=255
    }
  custom_color(){
    console.log(this.r_light,this.g_light,this.b_light);
    if(this.r_light>15){
      this.rhex =  Number(this.r_light).toString(16);
    }else{
      if(this.r_light>9 && this.r_light<16){
        if(this.r_light==10){
          this.rhex =  "0a"
        }else if(this.r_light==11){
          this.rhex =  "0b"
        }else if(this.r_light==12){
          this.rhex =  "0c"
        }else if(this.r_light==13){
          this.rhex =  "0d"
        }else if(this.r_light==14){
          this.rhex =  "0e"
        }else if(this.r_light==15){
          this.rhex =  "0f"
        }
      }else{
        this.rhex =  "0"+this.r_light.toString(16);
      }
    }
    if(this.g_light>15){
      this.ghex = Number(this.g_light).toString(16);
     }else{
      if(this.g_light>9 && this.g_light<16){
        if(this.g_light==10){
          this.ghex =  "0a"
        }else if(this.g_light==11){
          this.ghex =  "0b"
        }else if(this.g_light==12){
          this.ghex =  "0c"
        }else if(this.g_light==13){
          this.ghex =  "0d"
        }else if(this.g_light==14){
          this.ghex =  "0e"
        }else if(this.g_light==15){
          this.ghex =  "0f"
        }
      }else{
        this.ghex =  "0"+this.g_light.toString(16);
      }
    }
    if(this.b_light>15){
      this.bhex = Number(this.b_light).toString(16);
    }else{
      if(this.b_light>9 && this.b_light<16){
        if(this.b_light==10){
          this.bhex =  "0a"
        }else if(this.b_light==11){
          this.bhex =  "0b"
        }else if(this.b_light==12){
          this.bhex =  "0c"
        }else if(this.b_light==13){
          this.bhex =  "0d"
        }else if(this.b_light==14){
          this.bhex =  "0e"
        }else if(this.b_light==15){
          this.bhex =  "0f"
        }
      }else{
        this.bhex =  "0"+this.b_light.toString(16);
      }
    }
    this.color_set='#'+this.rhex+this.ghex+this.bhex;

    console.log(this.color_mix);
    let datar =  {
      id: 8,
      data1: this.r_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datar),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
  let datag =  {
    id: 9,
    data1: this.g_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datag),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  let datab =  {
  id: 10,
  data1: this.b_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datab),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  let datargb1 =  {
    id: 19,
    data1: this.r_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb1),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  let datargb2 =  {
  id: 20,
  data1: this.g_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb2),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  let datargb3 =  {
  id: 21,
  data1: this.b_light
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb3),)
  .subscribe(data => {
  console.log(data);
  }, error => {
  console.log(error);
  });
  this.doRefresh();
    }
    sum(){
      if(this.getr>15){
        this.rhex =  Number(this.getr).toString(16);
      }else{
        if(this.getr>9 && this.getr<16){
          if(this.getr==10){
            this.rhex =  "0a"
          }else if(this.getr==11){
            this.rhex =  "0b"
          }else if(this.getr==12){
            this.rhex =  "0c"
          }else if(this.getr==13){
            this.rhex =  "0d"
          }else if(this.getr==14){
            this.rhex =  "0e"
          }else if(this.getr==15){
            this.rhex =  "0f"
          }
        }else{
          this.rhex =  "0"+this.r_light.toString(16);
        }
      }
      if(this.getg>15){
        this.ghex = Number(this.getg).toString(16);
       }else{
        if(this.getg>9 && this.getg<16){
          if(this.getg==10){
            this.ghex =  "0a"
          }else if(this.getg==11){
            this.ghex =  "0b"
          }else if(this.getg==12){
            this.ghex =  "0c"
          }else if(this.getg==13){
            this.ghex =  "0d"
          }else if(this.getg==14){
            this.ghex =  "0e"
          }else if(this.getg==15){
            this.ghex =  "0f"
          }
        }else{
          this.ghex =  "0"+this.getg.toString(16);
        }
      }
      if(this.getb>15){
        this.bhex = Number(this.getb).toString(16);
      }else{
        if(this.getb>9 && this.getb<16){
          if(this.getb==10){
            this.bhex =  "0a"
          }else if(this.getb==11){
            this.bhex =  "0b"
          }else if(this.getb==12){
            this.bhex =  "0c"
          }else if(this.getb==13){
            this.bhex =  "0d"
          }else if(this.getb==14){
            this.bhex =  "0e"
          }else if(this.getb==15){
            this.bhex =  "0f"
          }
        }else{
          this.bhex =  "0"+this.getb.toString(16);
        }
      }
      this.color_set='#'+this.rhex+this.ghex+this.bhex;
      console.log('get '+ this.color_set);
    }
    async feed_active() {
      let date = new Date()
      var sdate= String(date);
      var splitted= sdate.split(" ", 5); 
      if(splitted[1]==="Jan"){
        splitted[1]='01'
      }else if(splitted[1]==="Feb"){
        splitted[1]='02'
      }else if(splitted[1]==="Mar"){
        splitted[1]='03'
      }else if(splitted[1]==="Apr"){
        splitted[1]='04'
      }else if(splitted[1]==="May"){
        splitted[1]='05'
      }else if(splitted[1]==="Jun"){
        splitted[1]='06'
      }else if(splitted[1]==="Jul"){
        splitted[1]='07'
      }else if(splitted[1]==="Aug"){
        splitted[1]='08'
      }else if(splitted[1]==="Sep"){
        splitted[1]='09'
      }else if(splitted[1]==="Oct"){
        splitted[1]='10'
      }else if(splitted[1]==="Nov"){
        splitted[1]='11'
      }else if(splitted[1]==="Dec"){
        splitted[1]='12'
      }
      this.getdate = splitted[2]+"-"+splitted[1]+"-"+splitted[3]+"/"+splitted[4]
      const toast = await this.toastController.create({
        message: 'FEED \n'+splitted[2]+"-"+splitted[1]+"-"+splitted[3]+" "+splitted[4],
        duration: 2500
      });
      toast.present();
      console.log(date);
      let data =  {
        id: 4,
        data1: this.getdate
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
    });
    let data2 =  {
      id: 16,
      data1: 1
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data2),)
  .subscribe(data => {
    console.log(data);
   }, error => {
    console.log(error);
  });
  
  this.get();
    } 
    checksublight(){
      if(this.w_light =="false"){
        
        let datargb1 =  {
          id: 19,
          data1: "0"
      }
      this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb1),)
      .subscribe(data => {
        console.log(data);
        }, error => {
        console.log(error);
      });
      let datargb2 =  {
        id: 20,
        data1: "0"
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb2),)
    .subscribe(data => {
      console.log(data);
      }, error => {
      console.log(error);
    });
    let datargb3 =  {
      id: 21,
      data1: "0"
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb3),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
      }else{
        let datargb1 =  {
          id: 19,
          data1: this.getr
      }
      this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb1),)
      .subscribe(data => {
        console.log(data);
        }, error => {
        console.log(error);
      });
      let datargb2 =  {
        id: 20,
        data1: this.getg
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb2),)
    .subscribe(data => {
      console.log(data);
      }, error => {
      console.log(error);
    });
    let datargb3 =  {
      id: 21,
      data1: this.getb
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(datargb3),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
  
      }
    }
    doRefresh() {
      this.getx();
      this.intnum=0;
      setTimeout(() => {
        console.log('Async operation has ended');
      
      }, 500);
    }
  autocheck(){
    console.log("check");
      if(this.getdate == this.autotimefeed){
        }
        this.intnum =1;
      }
  r_color(event){
    this.r_light=event;
    this.color_mix[0] = event;
    console.log("red color", this.r_light);
  }
  g_color(event){
    this.g_light=event;
    this.color_mix[1] = event;
    console.log("green color", this.g_light);
  }
  b_color(event){
    this.b_light=event;
    this.color_mix[2] = event;
    console.log("bule color", this.b_light);
  } 
  checktime(){
    let date = new Date()
    var sdate= String(date);
    var splitted= sdate.split(" ", 5); 
    var time =splitted[4];
    time = time[0]+time[1]+time[2]+time[3]+time[4]
      if (this.getdate == time){
        if(this.timeout ==0){
          let data =  {
            id: 24,
            data1: 1
        }
        this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
        .subscribe(data => {
          console.log(data);
         }, error => {
          console.log(error);
        });
            this.timeout=1;
        }
      }else{
        this.timeout=0;
      }
if(time == "00:00"){
  if(this.timeout2 ==0){
    let data =  {
      id: 26,
      data1: 1
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
  .subscribe(data => {
    console.log(data);
   }, error => {
    console.log(error);
  });

      this.timeout2=1;
  }
}else{
  this.timeout2=0;
}
  }
  stack(){
    let data =  {
      id: 1,
      data1: this.datalist[0]
  }
  this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
  .subscribe(data => {
    console.log(data);
    }, error => {
    console.log(error);
  });
  }
  sendquacheck2(){
      let data =  {
        id: 26,
        data1: 1
    }
    this.http.post(this.serverx+'/project/add.php',JSON.stringify(data),)
    .subscribe(data => {
      console.log(data);
     }, error => {
      console.log(error);
    });
    } 
}