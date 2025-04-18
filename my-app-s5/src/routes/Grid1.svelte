grid 1
<div class="parent">
	<div class="child">div1</div>
	<div class="child">div2</div>
	<div class="child">div3</div>
	<div class="child">div4</div>
	<div class="child">div5</div>
	<div class="child">div6</div>
	<div class="child">div7</div>
	<div class="child">div8</div>
</div>

<!-- DEFAULT VALUES
-->
<style>
	.parent {
		font-size: 0.75rem;
		width: 100%;
		height: 150px;
		border: 1px solid grey;
		padding: 1px;

		box-sizing: border-box;

		display: grid;
		/* gap: 2px; */

		/* grid-template-columns: 20% 20% 20% 20% 20%;
		grid-template-rows: 20% 20% 20% 20% 20%; */

		/* LEARN: Below two lines works same above two lines */
		/* grid-template-columns: repeat(5, 20%);
		grid-template-rows: repeat(5, 20%); */

		/* ❤️️️️🚀 LEARN: Below line works same above two lines */
		grid-template: repeat(5, 20%) / repeat(5, 20%);

		/* LEARN: Grid supports using different units at a same time.*/
		/* grid-template-columns: 100px 3em 40%; */

		/* LEARN: Create two columns of ration 1:5 (fractions (fr)) */
		/* grid-template-columns: 1fr 5fr; */

		/* LEARN: Using mix of px and fr units */
		/* grid-template-rows: repeat(4, 12.5px) 1fr; */
	}
	.child {
		border: 1px solid orange;
		/* padding: 5px; */
		/* TODO: Check margin causes sideeffects in grid too like it does in flex? */
		/* margin: 1px; */
		/* width: 150px; */
	}
	.child:nth-of-type(2) {
		color: red;
		background: orange;

		/* grid-column-start: 2;
		grid-column-end: 4; */

		/* LEARN: Below two lines works same above two lines */
		/* grid-column-start: 4;
		grid-column-end: 2; */

		/* LEARN: Below two lines works same above two lines */
		/* grid-column-start: -5;
		grid-column-end: -3; */

		/* LEARN: Below two lines works same above two lines */
		/* grid-column-start: 2;
		grid-column-end: span 2; */

		/* LEARN: Below two lines works same above two lines */
		/* grid-column-start: span 2; */

		/* LEARN: Below line works same above two lines */
		/* grid-column: 2 / 4; */

		/* LEARN: Below line sets the child to occupy full row. */
		/* grid-column: 1 / -1; */

		/* grid-row-start: 3; */

		/* grid-row: 3/6; */

		/* Using both dimensions to position: */
		/* grid-row-start: 5;
		grid-column-start: 2; */

		/* LEARN: Acronym RCRC (RowStart ColumnStart RowEnd ColumnEnd) */
		grid-area: 3 / 3 / 5 / 5;
	}

	.child:nth-of-type(3) {
		border: 2px solid red;
		background: deeppink;
		text-align: right;
		padding-top: 30px;

		grid-area: 4/4/6/6;
		/* LEARN: All child have `order: 0` by default. */
		order: -1;
	}
</style>
