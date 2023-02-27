import '../../styles/main.scss';
import './Analytics.scss';
import BasePage from '../BasePage/BasePage';
import { Route } from '../../types/enums';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import AppState from '../../constants/appState';
import ChartDailyExpenses from '../../components/ChartDailyExpenses/ChartDailyExpenses';
import Calendar from '../../components/Calendar/Calendar';
import ChartMonthlyExpIncom from '../../components/ChartMonthlyExpIncom/ChartMonthlyExpIncom';
import ChartCategories from '../../components/ChartCategories/ChartCategories';
import Preloader from '../../components/Preloader/Preloader';

class Analytics extends BasePage {
  private chartDailyExpenses: ChartDailyExpenses;

  private chartMonthlyExpIncom: ChartMonthlyExpIncom;

  private chartCategories: ChartCategories;

  constructor() {
    super();
    const endDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const startDate = new Date(new Date().setFullYear(endDate.getFullYear() - 1));
    this.chartDailyExpenses = new ChartDailyExpenses(startDate, endDate);
    this.chartMonthlyExpIncom = new ChartMonthlyExpIncom(startDate, endDate);
    this.chartCategories = new ChartCategories(startDate, endDate);
  }

  public async render(): Promise<void> {
    this.createPageStructure(Route.ANALYTICS);

    const mainContent = document.querySelector(`.${ClassMap.mainContent}`);

    (mainContent as HTMLElement).innerHTML = '';
    const preloader = new Preloader(mainContent as HTMLElement);
    preloader.render();

    const calendarContainer = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.calendar],
    });

    const calendar = new Calendar(calendarContainer);
    calendar.init();

    const dailyExpenses = await this.chartDailyExpenses.render();
    const monthlyExpIncom = await this.chartMonthlyExpIncom.render();
    const categoriesChart = await this.chartCategories.render();

    const analyticPage = createElement({
      tag: 'div',
      classList: [ClassMap.analytic.main],
    });

    analyticPage.replaceChildren(calendarContainer, dailyExpenses, monthlyExpIncom, categoriesChart);

    mainContent?.replaceChildren(analyticPage);

    this.chartDailyExpenses.addChart();
    this.chartMonthlyExpIncom.addChart();
    this.chartCategories.addChart();

    (calendar.calendarInput as HTMLInputElement).addEventListener('input', async () => {
      const newDailyExpenses = new ChartDailyExpenses(new Date(AppState.startDate), new Date(AppState.endDate));
      dailyExpenses.replaceWith(await newDailyExpenses.render());
      newDailyExpenses.addChart();

      const newMonthlyExpIncom = new ChartMonthlyExpIncom(new Date(AppState.startDate), new Date(AppState.endDate));
      monthlyExpIncom.replaceWith(await newMonthlyExpIncom.render());
      newMonthlyExpIncom.addChart();

      const newCategoriesChart = new ChartCategories(new Date(AppState.startDate), new Date(AppState.endDate));
      categoriesChart.replaceWith(await newCategoriesChart.render());
      newCategoriesChart.addChart();
    });
  }
}

export default Analytics;
