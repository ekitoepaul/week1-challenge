// -----------------------------------------
//PESA HARAKA FEE CALCULATOR
// -----------------------------------------

// Fixed transaction limits
const Min_Withdrawl = 50;
const Max_Amount = 150000;

// 1. Ask for customer's full name
const customerName = prompt("Enter your full name:");

if (customerName === null || customerName.trim() === "") {
  console.log("Transaction cancelled: A valid customer name is required.");
} else {
  const fullName = customerName.trim();

  // 2. Ask for phone number
  const phoneInput = prompt("Enter your phone number:");

  if (phoneInput === null) {
    console.log("Transaction cancelled: Phone number is required.");
  } else {
    // Remove spaces from phone number
    const phoneNumber = phoneInput.replace(/\s/g, "");

    // Validate phone number
    if (!/^(07|01)\d{8}$/.test(phoneNumber)) {
      console.log(
        "Invalid phone number. Enter 10 digits starting with 07 or 01.",
      );
    } else {
      // Format phone number to international format
      const formattedPhone = "254" + phoneNumber.substring(1);

      // 3. Ask for transaction type
      const transactionInput = prompt(
        "Select transaction type:\n" +
          "1. Send money\n" +
          "2. Withdraw cash\n" +
          "3. Pay a business",
      );

      if (transactionInput === null || transactionInput.trim() === "") {
        console.log("Transaction cancelled: Select a transaction type.");
      } else {
        const transactionChoice = Number(transactionInput);

        let transactionType = "";

        // Switch statement for transaction selection
        switch (transactionChoice) {
          case 1:
            transactionType = "Send Money";
            break;

          case 2:
            transactionType = "Withdraw Cash";
            break;

          case 3:
            transactionType = "Pay a Business";
            break;

          default:
            console.log("Unknown transaction type. Select 1, 2 or 3.");
        }

        if (transactionType !== "") {
          // 4. Ask for transaction amount
          const amountInput = prompt("Enter transaction amount in KSh:");

          if (amountInput === null || amountInput.trim() === "") {
            console.log("Amount is required. Transaction cancelled.");
          } else {
            const amount = Number(amountInput);

            if (Number.isNaN(amount)) {
              console.log("Invalid amount. Please enter a valid number.");
            } else if (amount <= 0) {
              console.log("Invalid amount. Amount must be greater than zero.");
            } else if (amount > Max_Amount) {
              console.log(
                "Transaction refused: Maximum amount is KSh 150,000.",
              );
            } else if (transactionChoice === 2 && amount < Min_Withdrawl) {
              console.log("Transaction refused: Minimum withdrawal is KSh 50.");
            } else {
              // Calculate transaction fee
              let transactionFee = 0;

              if (amount <= 100) {
                if (transactionChoice === 2) {
                  transactionFee = 11;
                }
              } else if (amount <= 1000) {
                if (transactionChoice === 1) {
                  transactionFee = 13;
                } else if (transactionChoice === 2) {
                  transactionFee = 29;
                }
              } else if (amount <= 5000) {
                if (transactionChoice === 1) {
                  transactionFee = 53;
                } else if (transactionChoice === 2) {
                  transactionFee = 69;
                }
              } else if (amount <= 20000) {
                if (transactionChoice === 1) {
                  transactionFee = 87;
                } else if (transactionChoice === 2) {
                  transactionFee = 185;
                }
              } else if (amount <= Max_Amount) {
                if (transactionChoice === 1) {
                  transactionFee = 108;
                } else if (transactionChoice === 2) {
                  transactionFee = 309;
                }
              }

              // Calculate total transaction cost
              const totalAmount = amount + transactionFee;

              // Generate random six-digit reference
              const referenceNumber = Math.floor(
                100000 + Math.random() * 900000,
              );

              // Format numbers with thousands separators
              const formatMoney = (value) => value.toLocaleString("en-KE");

              // Ternary operator for free transactions
              const feeMessage =
                transactionFee === 0
                  ? "FREE"
                  : "KSh " + formatMoney(transactionFee);

              // Prepare receipt columns
              const receipt = `
========================================
          PESA HARAKA RECEIPT
========================================
Customer Name : ${fullName.toUpperCase()}
Phone Number  : ${formattedPhone}
Reference No. : ${referenceNumber}
----------------------------------------
Transaction   : ${transactionType}
----------------------------------------
${"Description".padEnd(22)}${"Amount (KSh)".padStart(12)}
${"Transaction".padEnd(22)}${formatMoney(amount).padStart(12)}
${"Transaction Fee".padEnd(22)}${feeMessage.padStart(12)}
----------------------------------------
${"TOTAL".padEnd(22)}${formatMoney(totalAmount).padStart(12)}
========================================
       Thank you for using Pesa Haraka!
========================================
`;

              console.log(receipt);
            }
          }
        }
      }
    }
  }
}
