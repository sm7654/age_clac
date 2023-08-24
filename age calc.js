const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentDate = new Date();
const Current_year = currentDate.getFullYear();
const Current_month = currentDate.getMonth() + 1;
const Currant_day = currentDate.getDate();
var years_of_age = 0;
var month_of_age = 0;
var days_of_age = 0;

if ((Current_year % 4 === 0 && Current_year % 100 !== 0) || Current_year % 400 === 0) {
    daysInMonth[1] = 29;
}

function metric_check(x) {
    const numericChars = "0123456789";
    for (let i=0;i<x.length;i++){
        if (!numericChars.includes(x[i])) {
            return true;
        }
    }
    return false;
}


function error_year() {
    document.getElementsByClassName("year_wraper")[0].classList.add("error_on");
    document.getElementsByClassName("input_year")[0].classList.add("error_on_input");
    document.getElementsByClassName("Error_message_year")[0].innerHTML = "Must be in the past";
}
function error_month() {
        document.getElementsByClassName("month_wraper")[0].classList.add("error_on");
        document.getElementsByClassName("input_month")[0].classList.add("error_on_input");
        document.getElementsByClassName("Error_message_month")[0].innerHTML = "Must be a valid month";    
}
function error_day() {
        document.getElementsByClassName("day_wraper")[0].classList.add("error_on");
        document.getElementsByClassName("input_day")[0].classList.add("error_on_input");
        document.getElementsByClassName("Error_message_day")[0].innerHTML = "Must be a valid day";
}
function date_scan(User_year, User_month, User_days) {
    var ok = 0;
    if (User_year > Current_year) {
        error_year();
        ok++;
    }
    if (1 > User_month || User_month > 12) {
        error_month();
        ok++;
    }
    if (User_days < 1 || User_days > daysInMonth[User_month - 1]) {
        error_day();
        ok++;
    }
    if (User_year === Current_year && User_month > Current_month) {        
        error_month();
        ok++;
    }
    if (User_year === Current_year && User_month <= Current_month && User_days > Currant_day) {
        error_day();
        ok++;
    }
    if (metric_check(document.getElementById('days').value)) {
        error_day();        
        ok++;
    }
    if (metric_check(document.getElementById('month').value)) {
        error_month();
        ok++;
    }
    if (metric_check(document.getElementById('year').value)) {
        error_year();    
        ok++;
    }
    console.log(ok);
    if (ok > 0) {
        return false;
    }
    return true;
}


function Days_clac(User_days, User_month) {
    if (Currant_day === User_days) {
        days_of_age = 0;
        Update_date();

    } else if (Currant_day > User_days) {
        days_of_age = Currant_day - User_days;
        Update_date();

    } else {//Currant_day < User_days
        if (User_month === 2) {                                                                                        
            month_of_age--;
            days_of_age = daysInMonth[month_of_age - 1] - User_days + Currant_day;
            Update_date();
        } else {
            days_of_age = daysInMonth[User_month - 1] + Currant_day - User_days;
            month_of_age--;
            Update_date();
        }
    }
}


function Update_date() {
    document.getElementById("age_years").innerHTML = years_of_age;
    document.getElementById("age_months").innerHTML = month_of_age;
    document.getElementById("age_days").innerHTML = days_of_age;
}


function age_clac() {
    const User_year = parseInt(document.getElementById('year').value);
    const User_month = parseInt(document.getElementById('month').value);
    const User_days = parseInt(document.getElementById('days').value);
    if (date_scan(User_year, User_month, User_days)) {
        if (Current_year >= User_year) {
            years_of_age = Current_year - User_year;
            console.log("1");

            if (Current_month > User_month) {
                console.log("2");
                month_of_age = Current_month - User_month;

                Days_clac(User_days, User_month);

            } else if (Current_month < User_month) {
                years_of_age--;
                month_of_age = 12 - (User_month - Current_month);
                Days_clac(User_days, User_month);
            }
            else {//Current_month === User_month
                if (Currant_day >= User_days) {
                    month_of_age = 0;
                    Days_clac(User_days, User_month);
                }
            }
        }
    }
}

var date_check = document.getElementById("submitBtn").addEventListener('click', age_clac);
for (let j=0; j<document.getElementsByClassName("input").length; j++){
    document.getElementsByClassName("input")[j].addEventListener('input', (event) => {
        for (let i=0; i<document.getElementsByClassName("title_date_input_wraper").length; i++){ 
            document.getElementsByClassName("title_date_input_wraper")[i].classList.remove("error_on");
            document.getElementsByClassName("error_messege")[i].innerHTML = "";
            document.getElementsByClassName("input")[i].classList.remove("error_on_input");
        }   
    });  
}

