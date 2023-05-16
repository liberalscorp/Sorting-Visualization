
function load_func()
{
	var file = document.getElementById("load").files[0];
	var reader = new FileReader();
	
	
	reader.onloadend = function (){
	//var textarea = document.getElementId("array").value;
	var arr =  [];
	
	arr.push(reader.result);
	//alert(arr);
	document.getElementById("array").value = arr;
	//document.getElementById("textarea").value = arr;
	
	};
	reader.readAsText(file);
	
	
}


function sortIt() {
	var arrStr = document.getElementById('array').value;
	var arr = arrStr.split(',').map(Number);
	var algo = parseInt(document.getElementById('algorithm').value);
	
	
	switch(algo) {
		case 0:
			bubbleSort(arr);
			document.getElementById("space_complexity").value = "O(1)";
			
			break;
		case 1:
			selectionSort(arr);
			document.getElementById("space_complexity").value = "O(1)";
			break;
		case 2:
			insertionSort(arr);
			document.getElementById("space_complexity").value = "O(1)";
			break;
		case 3:
			mergeSort(arr);
			document.getElementById("space_complexity").value = "O(n)";
			break;
		case 4:
			quickSort(arr, 0);
			document.getElementById("space_complexity").value = "O(n)";
			break;
		case 5:
			quickSort(arr, 1);
			document.getElementById("space_complexity").value = "O(n)";
			break;
		case 6:
			Heapsort(arr);
			document.getElementById("space_complexity").value = "O(1)";
			break;
		case 7:
			countSort(arr);
			document.getElementById("space_complexity").value = "O(k) ";			
			break;
		case 8:
			radixsort(arr);
			document.getElementById("space_complexity").value = "O(n + k) ";
			break;
		case 9:
			bucketSort(arr);
			document.getElementById("space_complexity").value = "O(n)";
			break;
		case 10:
			hybridSort(arr,0, arr.length -1 ,  100 ); 
			document.getElementById("space_complexity").value = "O(n)";
			break;
		
		
	}
}

function generateArray(size, max) {
	// function to make array of `size` random values < `max`
	var arr = [];
	for(var i = 0; i < size; i++)
		arr.push(Math.floor(Math.random() * max));
	document.getElementById('array').value = arr.toString();
	

}




function bubbleSort(arr) {
	var results = [];
	var swapped;
	do {
		swapped = false;
		for (var i=1; i < arr.length; i++) {
			if (arr[i-1] > arr[i]) {
				var temp = arr[i-1];
				arr[i-1] = arr[i];
				arr[i] = temp;
				swapped = true;
			}
			results.push(arr.slice());
		}
	} while (swapped);
	showResults(results);
}



function selectionSort(arr) {
	var results = [];
	for(var i=0; i<arr.length-1; i++) {
		var minIndex = i;
		for(var j=i+1; j < arr.length; j++) {
			minIndex = arr[minIndex] < arr[j] ? minIndex : j;
			results.push(arr.slice());
		}
		var temp = arr[minIndex];
		arr[minIndex] = arr[i];
		arr[i] = temp;
		results.push(arr.slice());
	}
	showResults(results);
	//document.getElementById("time_complexity").value = Math.pow(n,2);
	
}

function insertionSort(arr) {
	var results = [];
	results.push(arr.slice());
	var n = arr.length;
	for(var i = 1; i < n; i++) {
		var j;
		for(j = i-1; arr[j] > arr[i] && j >= 0; j--)
			results.push(arr.slice());
		var temp = arr[i];
		var index = j+1;
		for(j = i; j > index; j--) {
			arr[j] = arr[j-1];
			results.push(arr.slice());
		}
		arr[index] = temp;
		results.push(arr.slice());
	}
	showResults(results);
}

function mergeSort(arr) {
	// NOTE: this is an iterative implementation as opposed to a recursive one
	var results = [];
	results.push(arr.slice());
	var currentSize;
	var left;
	var n = arr.length;
	for (currentSize = 1; currentSize < n; currentSize *= 2) {
		for (left = 0; left < n-1; left += 2*currentSize) {
			var mid = left + currentSize - 1;
			var right = Math.min(left + 2*currentSize - 1, n-1);
			merge(arr, left, mid, right, results);
		}
	}
	showResults(results);
}

function merge(arr, leftIndex, midIndex, rightIndex, results) {
	// merge subroutine for `mergSort`
	var i, j, k;
	var leftSize = midIndex - leftIndex + 1;
	var rightSize =  rightIndex - midIndex;

	var leftArr = [];
	var rightArr = [];
	for (i = 0; i < leftSize; i++)
		leftArr.push(arr[leftIndex + i]);
	for (j = 0; j < rightSize; j++)
		rightArr.push(arr[midIndex + 1+ j]);
	
	i = 0;
	j = 0;
	k = leftIndex;
	while (i < leftSize && j < rightSize) {
		if (leftArr[i] <= rightArr[j]) {
			arr[k] = leftArr[i];
			i++;
		}
		else {
			arr[k] = rightArr[j];
			j++;
		}
		k++;
		results.push(arr.slice());
	}

	while (i < leftSize) {
		arr[k] = leftArr[i];
		i++;
		k++;
		results.push(arr.slice());
	}

	while (j < rightSize) {
		arr[k] = rightArr[j];
		j++;
		k++;
		results.push(arr.slice());
	}
}

function quickSort(arr, partitionType) {
	results = [arr.slice()];
	quickSortRecurse(arr, 0, arr.length-1, results, partitionType);
	showResults(results);
}

function quickSortRecurse(arr, left, right, results, partitionType) {
	// helper function for `quickSort`
	if (right > left) {
		var oldPivotIndex;
		switch(partitionType) {
			case 0:
				oldPivotIndex = left + Math.floor( Math.random()*(right+1-left) );
				break;
			case 1:
				oldPivotIndex = medianOfThree(arr, left, right);
				break;
		}
		var newPivotIndex = partition(arr, left, right, oldPivotIndex, results);
		quickSortRecurse(arr, left, newPivotIndex - 1, results, partitionType);
		quickSortRecurse(arr, newPivotIndex + 1, right, results, partitionType);
	}
}

function medianOfThree(arr, left, right) {
	// return index of median of `arr[left]`, `arr[right]` and middle value
	mid = Math.floor((left + right)/2);
	temp = [arr[left], arr[mid], arr[right]];
	temp.sort();
	if(temp[1] == arr[left])
		return left;
	else if(temp[1] == arr[mid])
		return mid;
	else
		return right;
}

function partition(arr, left, right, pivotIndex, results) {
	// partition subroutine for quicksort
	var temp = arr[left];
	arr[left] = arr[pivotIndex];
	arr[pivotIndex] = temp;
	results.push(arr.slice());
	var newIndex = left;
	for(var j = left+1; j < right+1; j++) {
		if (arr[j] < arr[left]) {
			temp = arr[j];
			arr[j] = arr[newIndex+1];
			arr[newIndex+1] = temp;
			newIndex++;
		}
		results.push(arr.slice());
	}
	temp = arr[left];
	arr[left] = arr[newIndex];
	arr[newIndex] = temp;
	results.push(arr.slice());
	return newIndex;
}
    function Heapsort( arr)
    {
        var N = arr.length;
        var results = [];
 	
        // Build heap (rearrange array)
        for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
            heapify(arr, N, i);
         
        
 
        // One by one extract an element from heap
        for (var i = N - 1; i > 0; i--) {
            // Move current root to end
            var temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
 	
            // call max heapify on the reduced heap
            heapify(arr, i, 0);
            results.push(arr.slice());
            showResults(results);
        }
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    function heapify(arr, N, i)
    {
    	var results = [];
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2
 
        // If left child is larger than root
        if (l < N && arr[l] > arr[largest])
            largest = l;
 
        // If right child is larger than largest so far
        if (r < N && arr[r] > arr[largest])
            largest = r;
 
        // If largest is not root
        if (largest != i) {
            var swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
 
            // Recursively heapify the affected sub-tree
            
            heapify(arr, N, largest);
           
        }
    }
    
    
function countSort(arr)
{
    var results = [];
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);
  
    var range = max - min + 1;
    var count = Array.from({length: range}, (_, i) => 0);
    var output = Array.from({length: arr.length}, (_, i) => 0);
    for (i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }
  
    for (i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
  
    for (i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        results.push(output.slice());
    }
  
    for (i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        
    }
    showResults(results);
}


function getMax(arr,n)
{
    let mx = arr[0];
        for (let i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
}
 
// A function to do counting sort of arr[] according to
    // the digit represented by exp.
function helpercountSort(arr,n,exp)
{
    let output = new Array(n); // output array
        let i;
        var results =[];
        let count = new Array(10);
        for(let i=0;i<10;i++)
            count[i]=0;
  
        // Store count of occurrences in count[]
        for (i = 0; i < n; i++)
            count[Math.floor(arr[i] / exp) % 10]++;
  
        // Change count[i] so that count[i] now contains
        // actual position of this digit in output[]
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];
  
        // Build the output array
        for (i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }
  
        // Copy the output array to arr[], so that arr[] now
        // contains sorted numbers according to current digit
        for (i = 0; i < n; i++)
            arr[i] = output[i];
            
            results.push(arr.slice());
            showResults(results);
       
}
 
// The main function to that sorts arr[] of size n using
    // Radix Sort

function radixsort(arr)
{
	var n = arr.length;
	var count = 0;
    // Find the maximum number to know number of digits
        let m = getMax(arr, n);
  	var results =[];
        // Do counting sort for every digit. Note that
        // instead of passing digit number, exp is passed.
        // exp is 10^i where i is current digit number
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
             helpercountSort(arr, n, exp);
	     results.push(arr.slice());
             showResults(results);
                
}

function bucketSort(arr)
{
     var n = arr.length;
     var results = [];
    if (n <= 0)
            return;
   
        // 1) Create n empty buckets       
        let buckets = new Array(n);
   
        for (let i = 0; i < n; i++)
        {
            buckets[i] = [];
        }
   
        // 2) Put array elements in different buckets
        for (let i = 0; i < n; i++) {
            let idx = arr[i] * n;
            buckets[Math.floor(idx)].push(arr[i]);
        }
   
        // 3) Sort individual buckets
        for (let i = 0; i < n; i++) {
            buckets[i].sort(function(a,b){return a-b;});
        }
           results.push(buckets.slice());
           showResults(results);
   
        // 4) Concatenate all buckets into arr[]
        let index = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                arr[index++] = buckets[i][j];
            }
            results.push(arr.slice());
            showResults(results);
        }
}
function helper_partition( arr , low , high)
{
	var pivot = arr[high];
	var i = low;
	var j = low;
	for ( i = low ; i < high ; i++)
	{
		if ( arr[i] < pivot )
		{
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
			j = j + 1;
			var results = [];
			results.push(arr.slice());
            		showResults(results);
		}
	}
	var temp = arr[j];
	arr[j] = arr[high];
	arr[high] = temp;
	return j;
}
function helper_insertionSort(arr , low , n)
{
	for ( var i =low + 1; i < n + 1;i++)
	{
		var val = arr[i];
		var j = i;
		while (j > low && arr[j-1] > val)
		{
			arr[j] = arr[j-1];
			j = j - 1;
			var results = [];
	 		results.push(arr.slice());
        		showResults(results);
		}
		arr[j] = val;
	}
}

function hybridSort( arr , low , high , boundary)
{
	 var results = [];
	 results.push(arr.slice());
         showResults(results);
	while ( low < high )
	{
		if ( high - low + 1 < boundary )
		{
			helper_insertionSort(arr , low , high);
			break;
		}
		else
		{
			var pivot  = helper_partition(arr, low , high);
			if ( pivot - low < high - pivot )
			{
				hybridSort(arr , low , pivot -1 , boundary);
				low = pivot + 1;
			}
			else
			{
				hybridSort(arr , pivot + 1 , high , boundary);
				high = pivot - 1;
			}
		}
	}
	var results = [];
	 results.push(arr.slice());
         showResults(results);


} 
function range_calc()
{
    var low = parseInt(document.getElementById("low").value);
    var high = parseInt(document.getElementById("high").value);
    var arrStr = document.getElementById('array').value;
    var arr = arrStr.split(',').map(Number);
    
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);
 
    
    var range = max + 1;
    var count = Array.from({length: range}, (_, i) => 0);	
    for (i = 0; i < arr.length; i++) {
         count[arr[i]]++;
        
    }
  
    for (i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
        
    }
    
 //1 
   if ( (high > max && low > min))
    {
    	temp = count[max] - count[low];
    }
//2 
   else if ( high > max && low < min)
    {
    	temp = arr.length ;
    }
//3
    else if ( high > max && low == min)
    {
    	temp = arr.length - 1;
    }
//4
    else if ( high < max && low > min)
    {
    	temp = count[high] - count[low];
    }
 //5
     else if ( high < max && low < min)
    {
    	temp = count[high];
    }
//6
     else if ( high < max && low == min)
    {
    	temp = count[high] - count[min] ;
    }
//7
     else if ( high == max && low > min)
    {
    	temp = count[max] - count[low] - 1;
    }
//8
     else if ( high == max && low < min)
    {
    	temp = arr.length - 1 ;
    }
//9
     else if ( high == max && low == min)
    {
    	temp = arr.length - 2 ;
    }
    
    if ( temp < 1 )
    {
    	 document.getElementById("counter").value = 0;
    }
    else
    {
    	document.getElementById("counter").value = temp;
    }
    
    
    
   
}

function Get_time_complexity(count)
{
	var algo = parseInt(document.getElementById('algorithm').value);
	var timeInterval = parseInt(document.getElementById('time interval').value);
	var arrStr = document.getElementById('array').value;
	var arr = arrStr.split(',').map(Number);
	
	var n = arr.length;
	var temp = n;
	switch(algo) {
		case 0:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n^2)'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 1:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n^2)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n^2)'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			
			document.getElementById("time_complexity").value = temp;
			break;
		case 2:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n^2)'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 3:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(nlog(n))';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(nlog(n))'
			}
			else
			{
				temp = '\u0398(nlog(n))'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 4:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(nlog(n))';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(nlog(n))'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 5:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(nlog(n))';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(nlog(n))'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 6:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(nlog(n))';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(nlog(n))'
			}
			else
			{
				temp = '\u0398(nlog(n))'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 7:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n + k)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n + k)'
			}
			else
			{
				temp = '\u0398(n + k)'
			}
			document.getElementById("time_complexity").value = temp;			
			break;
		case 8:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n + k)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n + k)'
			}
			else
			{
				temp = '\u0398(n + k)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 9:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n + k)';	
			}
			else if ( decider > n && decider < n*n + 2)
			{
				temp = '\u0398(n + k)'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
		case 10:
			var decider = count/timeInterval;
			if (decider < n)
			{
				temp = 	'\u03A9(n)';	
			}
			else if ( decider > n && decider < n*n)
			{
				temp = '\u0398(n^2)'
			}
			else
			{
				temp = '\u0398(n^2)'
			}
			document.getElementById("time_complexity").value = temp;
			break;
	
	}
}


function showResults(results) {
	// given an array of arrays(the different states the original array to be sorted goes through in a particular algorithm),
	// draw a chart and show them with a time interval in between each one
	var timeInterval = parseInt(document.getElementById('time interval').value);
	var loaderTimeWrapper = document.getElementById('loader_time wrapper');
	loaderTimeWrapper.innerHTML = '<div class="loader"></div>';
	var chart = makeChart(results[0]);
	var arr = chart.data.datasets[0].data;
	var colorArr = chart.data.datasets[0].backgroundColor;
	var i = 1;
	var timeTaken = 0;
	var count = 0;
	(function nextIteration() {
		for(var j = 0; j < colorArr.length; j++) {
			colorArr[j] = '#6E3667';
		}
		if(i < results.length) {
			for(var j = 0; j < arr.length; j++) {
				arr[j] = results[i][j];
				if(results[i][j] != results[i-1][j])
					colorArr[j] = '#88D317';
			}
			i++;
			timeTaken += timeInterval;
			setTimeout(nextIteration, timeInterval);
			
		}
		else
		{
			loaderTimeWrapper.innerHTML = '<div class=monospace>time taken: ' + timeTaken + ' ms</div>';
			count = timeTaken;
			Get_time_complexity(count);
		}
		
			
		chart.update();
	})();
	
	
	
	
	
}


function makeChart(arr) {
	// draws bar chart depicting `arr` and returns object reference to the chart
	var canvasWrapper = document.getElementById('canvas wrapper');
	canvasWrapper.innerHTML = '<canvas id="canvas"></canvas>';
	var labelArr = [];
	var colorArr = [];
	for(var i = 0; i < arr.length; i++) {
		labelArr.push('[' + i + ']');
		colorArr.push('black');
	}
	var algo = parseInt(document.getElementById('algorithm').value);
	if (algo == 7)
	{
		var chart = new Chart(document.getElementById('canvas'), {
		type: 'bar',
		data: {

			labels: labelArr,
			datasets: [
				{
					label: 'value',
					backgroundColor: colorArr,
					data: arr
				}
			]
		},
		options: {
			legend: {
				display: false
			},
			title: {
				display: false,
				text: 'graphical representation of array'
			},
			scales: {
				yAxes: [{

					ticks: {
						min: Math.min.apply(null, arr) - 1,
						max: 100
					}
				}]
			}
		}
	});
	}
	else
	{
		var chart = new Chart(document.getElementById('canvas'), {
		type: 'bar',
		data: {

			labels: labelArr,
			datasets: [
				{
					label: 'value',
					backgroundColor: colorArr,
					data: arr
				}
			]
		},
		options: {
			legend: {
				display: false
			},
			title: {
				display: false,
				text: 'graphical representation of array'
			},
			scales: {
				yAxes: [{

					ticks: {
						min: Math.min.apply(null, arr) - 1,
						max: Math.max.apply(null, arr) 
					}
				}]
			}
		}
	});
	}
	
	return chart;
}
