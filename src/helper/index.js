const getEstimation = (name) => {
  switch (name) {
    case "gosend":
      return "Today";
    case "jne":
      return "2 days";
    case "personal-courier":
      return "1 day";
  }
};

const getLabel = (name) => {
  switch (name) {
    case "gosend":
      return "GO-SEND";
    case "jne":
      return "JNE";
    case "personal-courier":
      return "Peronal Courier";
  }
};

const getPaymentLabel = (name) => {
  switch (name) {
    case "e-wallet":
      return "E-Wallet";
    case "bank":
      return "Bank Transfer";
    case "virtual-account":
      return "Virtual Account";
  }
};

const getFee = (name) => {
  switch (name) {
    case "gosend":
      return 15000;
    case "jne":
      return 9000;
    case "personal-courier":
      return 29000;
  }
};

const getOrderId = () => {
  const length = 5;
  const chars = "23456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export { getEstimation, getFee, getLabel, getPaymentLabel, getOrderId };
