window.onload=function ()
{
	var oTable=document.getElementById('taobao_table');
	var oBtnSelectAll=oTable.getElementsByTagName('input')[0];
	var aInputs=oTable.getElementsByTagName('input');
	var aRows=oTable.tBodies[0].rows;
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var i=0;
	
	//隔行变色
	interlaceColor();
	
	//加事件
	for(i=0;i<aInputs.length;i++)
	{
		if(aInputs[i].type=='button' && aInputs[i].value=='删除')
		{
			aInputs[i].onclick=doDelete;
		}
		
		if(aInputs[i].type=='checkbox' && aInputs[i]!=oBtnSelectAll)
		{
			aInputs[i].onclick=calcTotalPrice;
		}
	}
	
	oBtnSelectAll.onclick=function ()
	{
		selectAll();
		calcTotalPrice();
	}
	
	oBtnPrice.href="javascript:void(0);";
	oBtnPrice.order='none';
	oBtnPrice.onclick=sortByPrice;
	
	oBtnArea.href="javascript:void(0);";
	oBtnArea.order='none';
	oBtnArea.onclick=sortByArea;
};

function calcTotalPrice()
{
	var oTable=document.getElementById('taobao_table');
	var aRows=oTable.tBodies[0].rows;
	var fResult=0.0;
	var oSpanTotalPrice=oTable.tFoot.getElementsByTagName('span')[0];
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		if(aRows[i].getElementsByTagName('input')[0].checked)
		{
			fResult+=parseFloat(aRows[i].getElementsByTagName('span')[0].innerHTML.substring(1));
		}
	}
	oSpanTotalPrice.innerHTML='&yen;'+fResult.toFixed(2)+'元';
}

function selectAll()
{
	var oTable=document.getElementById('taobao_table');
	var oBtnSelectAll=oTable.getElementsByTagName('input')[0];
	var aInputs=oTable.tBodies[0].getElementsByTagName('input');
	
	var i=0;
	
	for(i=0;i<aInputs.length;i++)
	{
		if(aInputs[i].type=='checkbox')
		{
			aInputs[i].checked=oBtnSelectAll.checked;
		}
	}
}

function interlaceColor()
{
	var oTable=document.getElementById('taobao_table');
	var aRows=oTable.tBodies[0].rows;
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		if(i%2)
		{
			aRows[i].style.background='#fafafa';
		}
		else
		{
			aRows[i].style.background='';
		}
	}
}

function doDelete()
{
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	interlaceColor();
}

function sortTable(fnCmp)
{
	var oTable=document.getElementById('taobao_table');
	var aRows=oTable.tBodies[0].rows;
	var aRowsForSort=[];
	var oFragment=document.createDocumentFragment();
	var i=0;
	
	for(i=0;i<aRows.length;i++)
	{
		aRowsForSort.push(aRows[i]);
	}
	
	aRowsForSort.sort(fnCmp);
	
	for(i=0;i<aRowsForSort.length;i++)
	{
		oFragment.appendChild(aRowsForSort[i]);
	}
	
	oTable.tBodies[0].appendChild(oFragment);
	interlaceColor();
}

function sortByPrice()
{
	var oTable=document.getElementById('taobao_table');
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var result=1;
	
	switch(oBtnPrice.order)
	{
		case 'none':
		case 'asc':
			oBtnPrice.className='btn_active';
			oBtnPrice.order='desc';
			result=1;
			break;
		case 'desc':
			oBtnPrice.className='btn_down';
			oBtnPrice.order='asc';
			result=-1;
			break;
	}
	
	oBtnArea.order='none';
	oBtnArea.className='btn';
	
	sortTable
	(
		function (vRow1, vRow2)
		{
			var sPrice1=vRow1.cells[2].getElementsByTagName('span')[0].innerHTML;
			var sPrice2=vRow2.cells[2].getElementsByTagName('span')[0].innerHTML;
			
			var fPrice1=parseFloat(sPrice1.substring(1));
			var fPrice2=parseFloat(sPrice2.substring(1));
			
			if(fPrice1>fPrice2)
			{
				return result;
			}
			else if(fPrice1<fPrice2)
			{
				return -result;
			}
			else
			{
				return 0;
			}
		}
	);
}

function sortByArea()
{
	var oTable=document.getElementById('taobao_table');
	var oBtnPrice=oTable.tHead.getElementsByTagName('a')[0];
	var oBtnArea=oTable.tHead.getElementsByTagName('a')[1];
	var result=1;
	
	switch(oBtnArea.order)
	{
		case 'none':
		case 'asc':
			oBtnArea.className='btn_active';
			oBtnArea.order='desc';
			result=1;
			break;
		case 'desc':
			oBtnArea.className='btn_down';
			oBtnArea.order='asc';
			result=-1;
			break;
	}
	
	oBtnPrice.order='none';
	oBtnPrice.className='btn';
	
	sortTable
	(
		function (vRow1, vRow2)
		{
			var sArea1=vRow1.cells[3].innerHTML;
			var sArea2=vRow2.cells[3].innerHTML;
			
			return result*sArea1.localeCompare(sArea2);
		}
	);
}