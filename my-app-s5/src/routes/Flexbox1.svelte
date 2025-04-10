flexbox 1
<div class="parent">
	<div>div1</div>
	<div>div2</div>
	<div>div3</div>
	<div>div4</div>
	<div>div5</div>
	<div>div6</div>
	<div>div7</div>
	<div>div8</div>
</div>

<!-- 
Default values
==============
flex-direction: row                 Other values: column, row-reverse, column-reverse
justify-content: flex-start;        Other values: center, flex-end, space-betwen, space-around, etc
align-items: stretch;               Other values: center, flex-end, space-betwen, space-around, etc
align-content: stretch;             Other values: 

 flex-wrap: nowrap;                 Other values: wrap-reverse
 align-content: stretch;
-->
<style>
	.parent {
		width: 100%;
		border: 1px solid grey;
		padding: 1px;

		display: flex;
		flex-direction: column;
		justify-content: center;

		/* // TODO: Make video on commenting/commenting below key values individually and together. */
		height: 150px;
		flex-wrap: wrap;
		align-items: stretch;
		align-content: stretch;

		/* align-items: flex-start; */
		/* align-content: flex-start; */
	}
	div {
		border: 1px solid orange;
		padding: 1px;
		margin: 1px;
		width: 150px;
	}
</style>
