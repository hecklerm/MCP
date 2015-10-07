/*
 * Copyright (c) 2013 by Gerrit Grunwald
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Gauge = function(parameters) {
    var doc         = document;
    var param       = parameters        || {};
    var id          = param.id          || 'control';
    var parentId    = param.parentId    || 'body';
    var width       = param.width       || 100;
    var height      = param.height      || 100;
    var scalable    = param.scalable    || false;
    var value       = param.value       || 0;
    var decimals    = param.decimals    || 0;
    var animated    = param.animated    || false;
    var duration    = param.duration    || 3;
    var title       = param.title       || 'title';
    var unit        = param.unit        || 'unit';
    var minValue    = param.minValue    || 0;
    var maxValue    = param.maxValue    || 100;
    var sections    = param.sections    || null;
    var needleColor = param.needleColor || 'rgb(123, 123, 123)';

    var ANGLE_RANGE = 270;
    var RANGE       = maxValue - minValue;
    var ANGLE_STEP  = ANGLE_RANGE / RANGE;
    var START_ANGLE = 135 * Math.PI / 180;
    var STOP_ANGLE  = 45 * Math.PI / 180;

    value = value < minValue ? minValue : value;

    if (scalable) window.addEventListener("resize", onResize, false);

    // Create the <canvas> element
    var canvas    = doc.createElement('canvas');
    canvas.id     = id;
    canvas.width  = width;
    canvas.height = height;
    if (parentId === 'body') {
        doc.body.appendChild(canvas);
    } else {
        doc.getElementById(parentId).appendChild(canvas);
    }

    // Get the <canvas> context and create all buffers
    var mainCtx          = doc.getElementById(id).getContext('2d');
    var backgroundBuffer = doc.createElement('canvas');
    var foregroundBuffer = doc.createElement('canvas');


    function onResize() {
        if (scalable) {
            width  = window.innerWidth;
            height = window.innerHeight;
        }

        canvas.width  = width;
        canvas.height = height;

        backgroundBuffer.width  = width;
        backgroundBuffer.height = height;
        foregroundBuffer.width  = width;
        foregroundBuffer.height = height;

        mainCtx.canvas.width  = canvas.width;
        mainCtx.canvas.height = canvas.height;

        drawBackground();
        drawForeground();

        repaint();
    }

    function repaint() {
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
        mainCtx.drawImage(backgroundBuffer, 0, 0);
        mainCtx.drawImage(foregroundBuffer, 0, 0);
    }

    var drawBackground = function() {
        var ctx  = backgroundBuffer.getContext('2d');
        var size = backgroundBuffer.width < backgroundBuffer.height ? backgroundBuffer.width : backgroundBuffer.height;

        ctx.clearRect(0, 0, size, size);

        //sections
        ctx.save();
        ctx.translate(0.5 * size, 0.5 * size);
        ctx.rotate(135 * Math.PI / 180);        
        ctx.translate(-0.5 * size, -0.5 * size);
        if (null !== sections && 0 < sections.length) {
            for (var i = 0 ; i < sections.length ; i++) {
                drawSection(ctx, size, sections[i].start, sections[i].stop, sections[i].color);
            }
        }
        ctx.restore();

        //range        
        ctx.translate(0.485 * size, 0.485 * size);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        // hack for WebView, it can't do the arc at a time, so it's splitted in two
        ctx.arc(0.015 * size, 0.015 * size, 0.485 * size, START_ANGLE, 2*Math.PI, false); 
        ctx.arc(0.015 * size, 0.015 * size, 0.485 * size, 0, STOP_ANGLE, false);        
        ctx.translate(-0.485 * size , -0.485 * size);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = (size * 0.03).toFixed(0);        
        ctx.stroke();
    }

    var drawSection = function(ctx, size, start, stop, color) {
        start = start < minValue ? minValue : start > maxValue ? maxValue : start;
        stop  = stop  < minValue ? minValue : stop  > maxValue ? maxValue : stop;
        
        var sectionStartAngle = ((ANGLE_RANGE / RANGE * start - ANGLE_RANGE / RANGE * minValue)) * Math.PI / 180;
        var sectionStopAngle  = sectionStartAngle + (stop - start) / (RANGE / ANGLE_RANGE) * Math.PI / 180;
        
        ctx.translate(0.485 * size, 0.485 * size);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0.015 * size, 0.015 * size, 0.485 * size, sectionStartAngle, sectionStopAngle, false);
        ctx.moveTo(0, 0);
        ctx.translate(-0.485 * size, -0.485 * size);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    var drawForeground = function() {
        var ctx  = foregroundBuffer.getContext('2d');
        var size = backgroundBuffer.width < backgroundBuffer.height ? backgroundBuffer.width : backgroundBuffer.height;

        ctx.clearRect(0, 0, size, size);

        //needle
        ctx.save();
        ctx.translate(0.5 * size, 0.5 * size);        
        ctx.rotate((((ANGLE_STEP * (value - minValue)) - 135)) * Math.PI / 180);
        ctx.translate(-0.5 * size, -0.5 * size);

        ctx.beginPath();        
        ctx.moveTo(0.275 * size, 0.5 * size);
        ctx.bezierCurveTo(0.275 * size, 0.62426575 * size, 0.37573425 * size, 0.725 * size, 0.5 * size, 0.725 * size);
        ctx.bezierCurveTo(0.62426575 * size, 0.725 * size, 0.725 * size, 0.62426575 * size, 0.725 * size, 0.5 * size);
        ctx.bezierCurveTo(0.725 * size, 0.3891265 * size, 0.6448105 * size, 0.296985 * size, 0.5392625 * size, 0.2784125 * size);
        ctx.lineTo(0.5 * size, 0.0225);
        ctx.lineTo(0.4607375 * size, 0.2784125 * size);
        ctx.bezierCurveTo(0.3551895 * size, 0.296985 * size, 0.275 * size, 0.3891265 * size, 0.275 * size, 0.5 * size);
        ctx.closePath();
        ctx.fillStyle = needleColor;
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineJoin = 'bevel';
        ctx.lineCap  = 'round';
        ctx.lineWidth = (size * 0.03).toFixed(0);
        ctx.stroke();
        ctx.restore();

        //value
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = 'bold ' + (0.145 * size) + 'px Arial';
        ctx.fillText((parseFloat(value).toFixed(decimals) + unit), size * 0.5, size * 0.52, size * 0.38);

        //title
        ctx.font = (0.045 * size) + 'px ' + 'Arial';
        ctx.fillText(title, size * 0.5, size * 0.6, size * 0.38);
    }

    // Public methods
    this.setValue = function(newValue) {
        var newValue = parseFloat(newValue);
        if (animated) {
            var targetValue = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            var tween = new Tween(new Object(),'',Tween.regularEaseInOut, value, targetValue, duration);
            tween.onMotionChanged = function(event) {
                value = event.target._pos;
                drawForeground();
                repaint();
            };
            tween.start();
        } else {
            var oldValue = value;
            value = newValue < minValue ? minValue : (newValue > maxValue ? maxValue : newValue);
            if (value !== oldValue) {
                drawForeground();
                repaint();
            }
        }
    }

    this.setTitle = function(newTitle) {
        title = newTitle;
        drawForeground();
        repaint();
    }

    this.setSize = function(newSize) {
        width  = newSize;
        height = newSize;
        onResize();
    }

    // Initial paint
    onResize();
}
