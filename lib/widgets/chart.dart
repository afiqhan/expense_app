import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/transaction.dart';
import '../widget/chart_bar.dart';

class Chart extends StatelessWidget {
  final List<Transaction>
      recentTransactions; // To get record over the last 7 days

  //const Chart({Key? key, required this.recentTransactions}) : super(key: key);
  Chart(this.recentTransactions);

  // Step 2) Create a method to populate row dynamically in Row widget (Mon, Tue, Wed, etc)
  List<Map<String, Object>> get groupedTransactionValues {
    return List.generate(7, (index) {
      // Purpose to calculate the week day -> 7 days
      final weekDay = DateTime.now().subtract(
        // To calculate previous day based on index passing..
        Duration(days: index),
      );
      double totalSum = 0.0; // Initialise totalSum

      for (var i = 0; i < recentTransactions.length; i++) {
        if (recentTransactions[i].date.day == weekDay.day &&
            recentTransactions[i].date.month == weekDay.month &&
            recentTransactions[i].date.year == weekDay.year) {
          totalSum += recentTransactions[i].amount;
        }
      }
      

      print(DateFormat.E().format(weekDay));
      print(totalSum);

      return {
        'day': DateFormat.E().format(weekDay).substring(0,1),
        'amount': totalSum
      }; // constructor E provide build method to define weekday (Mon, Tue, Wed, etc)..
    });
  }
 double get totalSpending {
    return groupedTransactionValues.fold(0.0, (sum, item) {
      return sum + (item['amount'] as double);
    });
  }
  @override
  Widget build(BuildContext context) {    
    print(groupedTransactionValues);
    return Card(
      elevation: 6,                        // Step 1) Creating Row widget inside Card widget.. 
      margin: EdgeInsets.all(20),
      child: Padding (
        padding: EdgeInsets.all(10),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: groupedTransactionValues.map((data) {
            return Flexible(
              fit: FlexFit.tight,
              child: ChartBar(
                  data['day'].toString(),
                  (data['amount'] as double),
                  totalSpending == 0.0
                      ? 0.0
                      : (data['amount'] as double) / totalSpending),
            );
          }).toList(),
          )
      ),
    );
  }
}