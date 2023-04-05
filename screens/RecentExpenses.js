import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpencesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenseContext = useContext(ExpensesContext);

  //const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        setError('Coud not fetch expenses!');
      }
      setIsFetching(false);
      //setFetchedExpenses(expenses);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return(
      <ErrorOverlay message={error}/>
    );
  }

  if (isFetching) {
    return(
      <LoadingOverlay />
    );
  }

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date;
    const date7DaysAgo = getDateMinusDays(today, 7);

    return(
      (expense.date >= date7DaysAgo) && (expense.date <= today)
    );
  });

  return(
   <ExpensesOutput fallbackText='No expenses registered for the last 7 days' expenses={recentExpenses} expensesPeriod='Last 7 Days' />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({

});