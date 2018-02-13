"use strict";
var ctx, canvas;
var randomNumbers;
var interval = 400;
var chosenLength = 50000;
var maxVal = 360;
var sideLength;

function init() {
    randomNumbers = Array.from({length: chosenLength}, () => Math.random() * maxVal);
    canvas = document.getElementById('myCanvas');
    ctx = myCanvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sideLength = canvas.height <= canvas.width ? canvas.height*.5: canvas.width*.5;
    ctx.font = "10px Helvetica";
    ctx.lineWidth = 1;
}

function IntervalMergeSort(A) {
    var B = [];
    var length = A.length;
    IntervalBottomUpMergeSort(A, B, length);
}

function IntervalBottomUpMergeSort(A, B, n) {
    var returnValue;
    var width = 1;
    var i = 0;

    var temp = setInterval(() => {
        if (width < n) {
            if (i < n) {
                let comparisonsPerPass = Math.ceil(n / width*2)
                for (var iter = 0; iter < comparisonsPerPass; iter++) {
                    returnValue = executeInnerLoop(i, width, A, B, n);
                    i = returnValue.i;
                    B = returnValue.B;
                    if (i >= n) break;
                }
            } else {
                i = 0;
                width = width * 2;
                A = CopyArray(B, A, n);
                plotArray(A);
            }
        } else {
            clearInterval(temp);
            console.log(A);
        }
    }, interval);
}

function executeInnerLoop(i, width, A, B, n) {
    B = BottomUpMerge(A, i, Math.min(i+width, n), Math.min(i+2*width, n), B);
    var returnValue = {
        i: i+2*width,
        B: B
    };
    return returnValue;
}

function MergeSort(A) {
    var B = [];
    var length = A.length;
    return BottomUpMergeSort(A, B, length);
}

function BottomUpMergeSort(A, B, n) {
    for (var width = 1; width < n; width = 2 * width) {
        for (var i = 0; i < n; i = i + 2 * width) {
            B = BottomUpMerge(A, i, Math.min(i+width, n), Math.min(i+2*width, n), B);
        }
        A = CopyArray(B, A, n);
    }
    return A;
}

function BottomUpMerge(A, iLeft, iRight, iEnd, B) {
    var i = iLeft;
    var j = iRight;

    for (var k = iLeft; k < iEnd; k++) {
        if (i < iRight && (j >= iEnd || A[i] <= A[j])) {
            B[k] = A[i];
            i++;
        } else {
            B[k] = A[j];
            j++;
        }
    }
    return B;
}

function CopyArray(B, A, n) {
    for (var i = 0; i < n; i++) {
        A[i] = B[i];
    }
    return A;
}

function plotArray(A) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBorder();

    var length = A.length;
    for (var i = 0; i < length; i++) {
        let x = (canvas.width/2-sideLength/2) + i * (sideLength/length);
        let y = (canvas.height/2 - sideLength/2) + Math.random()*sideLength;
        ctx.fillStyle = 'hsl(' + A[i]+ ', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(x,y,1.5,0,2*Math.PI);
        ctx.fill();
    }
}

function drawBorder() {
    let width = 10;
    ctx.lineWidth = width;
    ctx.strokeStyle = "beige";
    var startX = canvas.width/2 - sideLength/2 - width/2;
    var startY = canvas.height/2 - sideLength/2 - width/2;
    drawRectangle(startX, startY, sideLength+width);
    ctx.lineWidth = 1;
}

function drawRectangle(x, y, w) {
    ctx.beginPath();
    ctx.rect(x, y, w, w);
    ctx.stroke();
}

init();
//randomNumbers = MergeSort(randomNumbers);
plotArray(randomNumbers);
IntervalMergeSort(randomNumbers);

