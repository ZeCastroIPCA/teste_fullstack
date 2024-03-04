// Get 200 status code for all requests
const get200Everytime = async (req, res) => {
  res.status(200).end();
};

// Get JSON array and count the number of elements
const count = async (req, res) => {
  try {
    const elements = req.body;
    res.status(200).json({ count: elements.length });
  } catch (error) {
    res.status(500).json({ message: 'Count unsuccessful' });
  }
};

// Order array items by quantity, payment condition and country
const order = (req, res) => {
  try {
    const elements = req.body;

    // Define payment condition priority
    const paymentPriority = { DIN: 0, '30': 1, R60: 2, '90': 3, '120': 4 };

    let count = 0;
    // Sort elements based on some criteria
    elements.sort((x, y) => {
      // Count the number of iterations
      count++;
    
      // Add 'previsao_consumo' field to each element
      x.previsao_consumo = x.quantidade * 5;
      
      // Sort by quantity (50%)
      // If the quantities are different (descending order)
      if (y.quantidade !== x.quantidade) {
        return y.quantidade - x.quantidade;
      }

      // Sort by payment condition (30%)
      // If the payment conditions are different 
      const paymentDiff = paymentPriority[x.condicao_pagamento] - paymentPriority[y.condicao_pagamento];
      if (paymentDiff !== 0) {
        return paymentDiff;
      }

      // Sort by country (20%)
      if (x.pais === 'PORT' && y.pais !== 'PORT') {
        return -1;
      } else if (x.pais !== 'PORT' && y.pais === 'PORT') {
        return 1;
      }

      // Unchanged
      return 0;
    });

    console.log("Final Counter:" + count);
    //console.log("Elements:", elements);

    res.status(200).json(elements);
  } catch (error) {
    res.status(500).json({ message: 'Order unsuccessful' });
  }
};

// Get data from API link and return it ('https://pastebin.pl/view/raw/8fced5f8')
const returnData = async (req, res) => {
  try {
    const fetchedData = await fetch('https://pastebin.pl/view/raw/8fced5f8');
    const data = await fetchedData.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'API request unsuccessful' });
  }
};

module.exports = { get200Everytime, count, order, returnData };
