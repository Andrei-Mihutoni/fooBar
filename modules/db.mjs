"use strict";

// const url = "https://foobarserver.herokuapp.com/"
const url = "https://arcane-shelf-51552-f7b339a90bed.herokuapp.com/"

const restDbUrl = "https://foobar-ad40.restdb.io/rest/queue"; //RestDB url link for POSTing to queue
const restDbAPIKey = "5fbf87774af3f9656800cf33" //RestDB API key 

export let rootData = "";

// Fetching the raw data from Heroku server
export function get(callback) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        });
};


export function prepareData(data) {
    showData(data);
    rootData = data;
    // calling the function to post queue data to RestDB
    // it's commented out so it doesen't post continuous, considering the free account limitations 
    // post();    
};


// spliting the raw data into individual scope for components

export function showData(data) {
};

export function getBar() {
    return rootData.bar;
}

export function getQueue() {
    return rootData.queue;
}

export function getServing() {
    return rootData.serving;
}

export function getBartenders() {
    return rootData.bartenders;
}

export function getTaps() {
    return rootData.taps;
}

export function getStorage() {
    return rootData.storage;
}

export function getQueueLength() {
    return rootData.queue.length;
}

export function getClosingTime() {
    return rootData.bar.closingTime;
}









// POST live queue data to RestDB for later use
export function post() {
    let queueData = getQueue();
    let dataToPost = {};
    for (let i = 0; i < queueData.length; i++) {
        let orderID = queueData[i].id;
        let startTimeStamp = queueData[i].startTime;
        let order = queueData[i].order + ",";
        let queueLength = queueData.length;

        // creating object and its format for the posting data in order to match the RestDB
        dataToPost = {
            orderID: orderID,
            startTime: startTimeStamp,
            order: order,
            queueLength: queueLength
        };
    }
    // converting the post object to JSON string
    const postData = JSON.stringify(dataToPost);

    fetch(restDbUrl, {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": restDbAPIKey,
            "cache-control": "no-cache"
        },
        body: postData
    })
        .then(res => res.json())
        .then(data => console.log(data));
}

