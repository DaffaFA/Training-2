/* eslint-disable react-hooks/exhaustive-deps */
import ReactModal from "react-modal";
import Chart from "react-apexcharts";
import { useMemo } from "react";

ReactModal.setAppElement("#root");

ReactModal.defaultStyles.content = {
  ...ReactModal.defaultStyles.content,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: "600px",
};

const Modal = ({ currency, onRequestClose, isOpen }) => {
  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateHourlyData = (initialTime, currency) => {
    if (!currency) return;

    let series = [];
    let timestamp = +initialTime;

    for (let i = 0; i < 24; i++) {
      series.push([
        timestamp,
        getRandomArbitrary(
          currency - currency * 0.2,
          currency + currency * 0.2
        ),
      ]);

      timestamp += 1000 * 60 * 60;
    }

    return series;
  };
  const hourlyData = useMemo(() => {
    if (!currency) return;

    return {
      options: {
        chart: {
          id: "hourly",
        },
        xaxis: {
          type: "datetime",
          title: {
            text: 'Hours'
          }
        },
        yaxis: {
          title: {
            text: 'Value'
          }
        },
        title: { text: "Hourly Rate" },
      },
      series: [
        {
          name: "Hourly Rate",
          data: generateHourlyData(
            new Date().setHours(0, 0, 0, 0),
            currency.value
          ),
        },
      ],
    };
  }, [currency, generateHourlyData]);

  const generateDailyData = (currency) => {
    if (!currency) return;

    let series = [];

    for (let i = 0; i < 7; i++) {
      series.push(
        getRandomArbitrary(currency - currency * 0.2, currency + currency * 0.2)
      );
    }

    return series;
  };

  const dailyData = useMemo(() => {
    if (!currency) return;

    return {
      options: {
        chart: {
          id: "daily",
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          title: {
            text: 'Day'
          }
        },
        yaxis: {
          title: {
            text: 'value'
          }
        },
        title: { text: "Daily Rate" },
      },
      series: [
        {
          name: "Daily Rate",
          data: generateDailyData(currency.value),
        },
      ],
    };
  }, [currency, generateDailyData]);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {hourlyData && (
        <Chart
          options={hourlyData.options}
          series={hourlyData.series}
          type="line"
        />
      )}
      {dailyData && (
        <Chart
          options={dailyData.options}
          series={dailyData.series}
          type="line"
        />
      )}
    </ReactModal>
  );
};

export default Modal;
