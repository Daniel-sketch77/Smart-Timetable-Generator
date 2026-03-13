function generate() {
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let periods = 9;
  let duration = 40;
  let breakStart = "12:00";
  let breakEnd = "12:30";
  let startTime = document.getElementById("startTime").value;

  if (!startTime) {
    alert("Please select a start time first!");
    return;
  }

  let subjects = [
    "Maths", "Maths", "Maths", "Maths",
    "Physics", "Physics", "Physics", "Physics",
    "Biology", "Biology", "Biology", "Biology",
    "Chemistry", "Chemistry", "Chemistry", "Chemistry",
    "English", "English", "English", "English",
    "Agric", "Agric", "Agric",
    "Computer", "Computer", "Computer",
    "Food & Nutrition", "Food & Nutrition", "Food & Nutrition",
    "Data Processing", "Data Processing", "Data Processing",
    "Civic", "Civic", "Civic"
  ];

  while (subjects.length < 45) {
    subjects.push("Free Period");
  }

  // Refined shuffle logic
  subjects.sort(function() {
    return Math.random() - 0.5;
  });

  function addMinutes(time, mins) {
    let parts = time.split(":");
    let date = new Date();
    date.setHours(parseInt(parts[0]));
    date.setMinutes(parseInt(parts[1]));
    date.setMinutes(date.getMinutes() + mins);

    let h = String(date.getHours()).padStart(2, '0');
    let m = String(date.getMinutes()).padStart(2, '0');
    return h + ":" + m;
  }

  let table = "<table><thead><tr><th>Day</th>";
  
  // Header Row
  let headerTime = startTime;
  for (let i = 0; i < periods; i++) {
    // Check for break in headers
    if (headerTime === breakStart) {
      table += "<th>Break</th>";
      headerTime = breakEnd;
    }
    let endTime = addMinutes(headerTime, duration);
    table += "<th>" + headerTime + " — " + endTime + "</th>";
    headerTime = endTime;
  }
  table += "</tr></thead><tbody>";

  let subjectIndex = 0;
  for (let d = 0; d < days.length; d++) {
    table += "<tr>";
    table += "<td class='day-cell'>" + days[d] + "</td>";
    let currentTime = startTime;

    for (let p = 0; p < periods; p++) {
      if (currentTime === breakStart) {
        table += "<td class='break'>REST</td>";
        currentTime = breakEnd;
        p--; // Don't count break as a period
        continue;
      }

      table += "<td>" + subjects[subjectIndex] + "</td>";
      subjectIndex++;
      currentTime = addMinutes(currentTime, duration);
    }
    table += "</tr>";
  }

  table += "</tbody></table>";
  document.getElementById("timetable").innerHTML = table;
}