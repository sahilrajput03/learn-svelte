<p class="red">
	ALL BELOW UPI LINKS DO NOT WORK. Please refer in this doc - <a
		target="_blank"
		class="helpful-link"
		href="https://docs.google.com/document/d/1ExXrRMalD2i-ZBc2mOFSTh47asqkP8MRNiVtAW3lvlc/edit?tab=t.154p77cbsbnz#heading=h.n5xdl04gt4eh"
		>UPI VIA RAZORPAY</a
	>
</p>

<a
	class="block-link"
	href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=0000&mode=02&purpose=00"
>
	Pay Vijay Merchant Account (all params)
</a>

<a class="block-link" href="upi://pay?pa=Q333412475@ybl"
	>Pay Vijay Merchant Account (2 - no params)</a
>

<!-- from https://github.com/prem911/deeplink -->
<a
	class="block-link"
	href="upi://pay?pa=prem.mohapatra@oksbi&pn=PNLBot&am=1&tn=MonthlyFees&tr=uuid"
>
	Pay prem.mohapatra with all params</a
>

<a
	class="block-link"
	href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=5812&tn=note&am=1&cu=INR"
>
	Pay (ChatGPT example, mc=5812 (eating places & restaurants), without `tid` and `tr`)
</a>

<a
	class="block-link"
	href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=5812&tid=uniqueTransactionID&tr=transactionRefId&tn=note&am=1&cu=INR"
>
	Pay (ChatGPT example, mc=5812 (eating places & restaurants))
</a>

<!-- src: https://stackoverflow.com/a/74364961/10012446 -->
<a
	class="block-link"
	href="paytmmp://pay?pa=Q333412475@ybl&pn=User1&tn=Test UPI&am=1&cu=INR&mc=1234&tr=01234"
>
	Using paytmmp
</a>

<!-- 
Params:
- pa = payee address
- pn = payeename
- mc = merchant code (merchant category code)
- ? tid = transaction id
- ? tr = transaction reference id
- tn = transaction note
- am = amount
- cu = currency

-->

<hr />

<p>Non-merchant account -</p>

<a class="block-link" href="upi://pay?pa=8360267243@ptyes&pn=John%20Doe&am=100&cu=INR">Pay Sahil</a>

<style>
	hr,
	.block-link {
		display: block;
		margin-top: 20px;
		color: blue;
	}

	.helpful-link {
		color: blue;
		text-decoration: underline;
	}

	.red {
		color: red;
		font-weight: bold;
	}
</style>
