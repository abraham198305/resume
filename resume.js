$(fnInit())

var links;

function fnInit() {
 console.log("init");
 fnLoadData();
}

function fnLoadData() {
 fetch("links.json")
  .then(response => response.json())
  .then(data => {
   links = data;
   console.log(links);
  });

 fetch("data.json")
  .then(response => response.json())
  .then(data => {
   str = [
    "objective",
    "hobbies",
    "interests",
    "publications",
   ];
   str.forEach(item => {
    $('#' + item).append(`
    <div style="padding-bottom: 1rem;">
     <div style="padding-bottom: 0.5rem; color: black; font-weight: bolder;"><i class="`+ data[item]["icon"] + `"></i> ` +
     data[item]["title"] +
     `</div>
     <div style="padding-left: 0.5rem; font-size: smaller;">`+
     data[item]["content"] +
     `</div>
    </div>
   `);
   });

   str = [
    "academics",
    "occupations"
   ];
   str.forEach(item => {
    if (data[item] != null) {
     strHtml = `
     <div style="padding-bottom: 1rem;">
     <div style="padding-bottom: 0.5rem;  color: black; font-weight: bolder;">
      <i class="`+
      data[item]["icon"] + `"></i> ` +
      data[item]["title"] + `
     </div>
     `;
     strHtml_1 = "";
     index = 0;
     data[item]["content"].forEach(item_1 => {
      strPadding = "0.5";
      if (index == data[item]["content"].length - 1) {
       strPadding = "0";
      };
      index++;

      strOrg = "";
      if (item_1["organization"] != "") {
       strOrg = `<i class=" fas fa-landmark"></i> ` + fnStr2LinkHTML(item_1["organization"]) + `<br>`;
      };

      strScore = "";
      if (item_1["score"] != "" && item_1["score"] != null) {
       strScore = `<br><i class="fas fa-chart-line"></i> ` + item_1["score"];
      };

      strTools = "";
      if (item_1["tools"] != "" && item_1["tools"] != null) {
       strTools = `<br><i class="fa fa-wrench"></i> ` + fnList2linksHTML(item_1["tools"]);
      };

      strText_1 = "";
      strText_2 = "";

      switch (item) {
       case str[0]:
        strText_1 = item_1["course"];
        strText_2 = item_1["subject"];
        break;
       case str[1]:
        strText_1 = item_1["designation"];
        strText_2 = item_1["industry"];
        break;
      }

      strHtml_1 += `
      <div style="padding-left: 0.5rem; font-size: smaller;">
       <div style="padding-bottom: `+ strPadding + `rem;">
        <div style="font-weight: bolder;">`+ strText_1 + `</div>
        <div>`+ strText_2 + `
         <div style="padding-left: 0.5rem;"> `+ strOrg + `
          <i class="far fa-calendar-alt"></i> ` +
       item_1["start"] +
       ` - ` +
       item_1["end"] +
       strScore + strTools + `
         </div>
        </div>
       </div>
      </div>`;
     });
     strHtml += strHtml_1 + `</div>`
     $('#' + item).append(strHtml);
    };
   });
  });

}

function fnList2linksHTML(arrayStr) {
 strTools = ""
 index = 0;
 arrayStr.forEach(item => {
  strTools += fnStr2LinkHTML(item)
  if (index < arrayStr.length - 1) {
   strTools += ", ";
  };
  index++;
 });
 return strTools;
}

function fnStr2LinkHTML(str) {
 if (links[str] != null) {
  return `<a href='` + links[str] + `'>` + str + `</a>`;
 }
 return str;
}