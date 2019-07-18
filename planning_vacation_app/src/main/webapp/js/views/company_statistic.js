var companyStatisticView;

companyStatisticView={

    selectPanel:function(){
        $$("main").removeView(rightPanel); // brisanje trenutno prikazanog view-a na stranici kako bi se prikazao facultyView
        rightPanel = "companyStatisticPanel";


        var panelCopy = webix.copy(this.getPanel()); // webix.copy -> duboka kopija
        $$("main").addView(panelCopy);
        webix.protoUI({
            name: "fadeInWindow",
            $init: function () {
                this.$ready.push(function () {
                    this.attachEvent("onShow", function () {
                        this.$view.className = this.$view.className.split("animated")[0] + " animated fadeInDownBig";
                    })
                    this.attachEvent("onHide", function () {
                        this.$view.style.display = "block";
                        this.$view.className += " animated fadeOutUpBig";
                    })
                });
            }
        }, webix.ui.window);
    },
    getPanel:function(){
       return {
           id:"companyStatisticPanel",
           cols:[{
               view:"datatable",
               id:"company_statisticDT",
               width:180,
               navigation: true, // omoguceno selektovanje redova navigacijskim tasterima na tastaturi
               select: "row",
               multiselect: false,
               columns:[{
                   id:"id",
                   hidden:true
               },{
                   id:"firstName",
                   hidden:true
               },{
                   id:"lastName",
                   hidden:true
               },{
                   id:"lfName",
                   header:"Zaposleni",
                   width:180,
                   sort:"string",
                   template:function(obj){
                      var pom=obj.firstName+" "+obj.lastName;
                      return pom;
                   }
               }],
               url: "/hub/user"
           },{
               rows:[{
                   view:"chart",
                   type:"bar",
                   value:"#number#",
                   label:"#number#",
                   height:300,
                   radius:0,
                   barWidth:80,
                   yAxis:{
                       template:"",
                       start:0, end:10, step:1
                   },
                   xAxis:{
                       title:"Odsutni po mjesecu",
                       template:"'#month#'",
                       lines: false
                   },
                   padding:{
                       left:10,
                       right:10,
                       top:50
                   },
                   url:"/hub/company/statistics/all"

                       },
                   {
cols:[{
    view: "chart",
    type:"donut",

    legend:{
        width: 75,
        align:"right",
        valign:"middle"
    },
    shadow:0,
    gradient:true

},{
    view: "chart",
    type:"pie",
    value:"#number#",
    color:"#color#",
    legend:{
        width: 75,
        align:"right",
        valign:"middle",
        template:"#month#"
    },
    shadow:0,
    gradient:true,
    pieInnerText:"#month#",

    url:"/hub/company/statistics/all"
}]
               }]
           }]
       }
    }
}