import React from "react";
import AppExpensePage from '../components/AppExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashBoardPage from '../components/ExpenseDashBoardPage';
import Header from '../components/Header';
import HelpExpensePage from '../components/HelpExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";


const AppRouter = () =>  (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashBoardPage} exact={true}/>
                <Route path="/create" component={AppExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
