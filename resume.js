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
			//console.log(links);
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
     <div>
     	<div style="color: black; font-weight: bolder;">
							<i class="`+
						data[item]["icon"] + `"></i> ` +
						data[item]["title"] + `
							<div style="padding-bottom: 0.5rem;"></div>
     	</div>
     `;
					strHtml_1 = "";
					index_1 = 0;
					data[item]["content"].forEach(item_1 => {
						strPadding = "0.5";
						if (index_1 == data[item]["content"].length - 1) {
							strPadding = "0";
						};
						index_1++;

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
						/*

						strOrg = "";
						if (item_1["organization"] != "") {
							strOrg = `<i class=" fas fa-landmark"></i> ` + fnStr2LinkHTML(item_1["organization"]) + `<br>`;
						};
						
						strScore = "";
						strType = "score";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strScore = `<br><i class="fas fa-chart-line"></i> ` + item_1[strType];
						};

						strTools = "";
						strType = "tools";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTools = `<br><i class="fa fa-wrench"></i> ` + fnList2linksHTML(item_1[strType]);
						};

						strTasks = "";
						strType = "tasks"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTasks = `<br><i class="fas fa-tasks"></i> ` + fnList2linksHTML(item_1[strType]);
						};

						strSubjects = "";
						strType = "subjects"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strSubjects = `<br><i class="fa fa-book"></i> ` + item_1[strType];
						};
						*/

						strOrg = "";
						if (item_1["organization"] != "") {
							strOrg = `<tr><td><i class="fas fa-landmark"></i></td><td>` + fnStr2LinkHTML(item_1["organization"]) + `</td></tr>`;
						};

						strScore = "";
						strType = "score";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strScore = `<tr><td><i class="fas fa-chart-line"></i></td><td>` + item_1[strType] + `</td></tr>`;
						};

						strTools = "";
						strType = "tools";
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTools = `<tr><td><i class="fa fa-wrench"></i></td><td>` + fnList2linksHTML(item_1[strType]) + `</td></tr>`;
						};

						strTasks = "";
						strType = "tasks"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strTasks = `<tr><td><i class="fas fa-tasks"></i></td><td>` + fnList2linksHTML(item_1[strType]) + `</td></tr>`;
						};

						strSubjects = "";
						strType = "subjects"
						if (item_1[strType] != "" && item_1[strType] != null) {
							strSubjects = `<tr><td><i class="fa fa-book"></i></td><td>` + item_1[strType] + `</td></tr>`;
						};

						strHtml_1 += `
      <div style="padding-left: 0.5rem; font-size: smaller;">
							<div style="font-weight: bolder;">`+ strText_1 + `</div>
							<div>`+ strText_2 + `
								<div style="padding-left: 0.5rem;">
								<table> `+
							strOrg + `
									<tr>
										<td><i class="far fa-calendar-alt"></i></td><td>`
							+ item_1["start"] +
							` - ` +
							item_1["end"] + `</td>
									</tr>`+ strScore + strTools + strTasks + strSubjects + `
								</table> ` +
							/*	
							<i class="far fa-calendar-alt"></i> ` +
						item_1["start"] +
						` - ` +
						item_1["end"] +
						strScore + strTools + strTasks + strSubjects + `
						*/
							""
							+ `
								</div>
							</div>
							<div style="padding-bottom: `+ strPadding + `rem;"></div>
      </div>
						</div>`;
					});
					strHtml += strHtml_1 + `<div style="padding-bottom:1rem;"></div></div>`
					$('#' + item).append(strHtml);
				};
			});
		});

}

function fnList2linksHTML(arrayStr) {
	switch (strType) {
		case "tools":
			strSeperator = ", ";
			break;
		case "tasks":
			strSeperator = " ";
			break;
	}
	strLinkHTML = ""
	index_2 = 0;
	arrayStr.forEach(item => {
		strLinkHTML += fnStr2LinkHTML(item);
		if (index_2 < arrayStr.length - 1) {
			strLinkHTML += strSeperator;
		};
		index_2++;
	});
	strLinkHTML += "."
	return strLinkHTML;
}

function fnStr2LinkHTML(str) {
	if (links[str] != null) {
		return `<a href='` + links[str] + `'>` + str + `</a>`;
	}
	return str;
}