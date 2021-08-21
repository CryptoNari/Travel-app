/**
* @description Compares two dates and returns a object
* @param {string} start - Start Date
* @param {string} end - End Date
* @returns {object} result of date compare(valid,start,end,count,duration,error)
*/

const dateCompare = (start,end) => {
    let errormsg,accepted;
   
    // convert dates into a Date format to compare values
    const currentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Get values for count (days until start) and duration (start to end)
    const count = (Math.ceil((startDate.getTime() -currentDate.getTime() ) / (24*60*60*1000)));
    const duration = (1 + Math.ceil((endDate.getTime() -startDate.getTime() ) / (24*60*60*1000)));

    // verify start input has not passed
    if (count < 0) {
        accepted = false;
        errormsg = 'Start Date already passed. Check your input!';
    } else {
        // verify start is earlier than end
        if (duration < 1) {
            accepted = false;
            errormsg = 'End Date before Start Date. Check your input!';
        } else {
            accepted = true;
            errormsg = '';
            }
    }
    
    return {
        valid: accepted,
        start: start,
        end: end,
        daysToTrip: count,
        lengthOfTrip: duration,
        error: errormsg 
    }
}

export {dateCompare}