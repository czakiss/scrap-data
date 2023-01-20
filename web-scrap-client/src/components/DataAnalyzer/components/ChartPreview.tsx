import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DataDto } from "../types/DataAnalyzerTypes";
import dateFormat from "dateformat";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartPreviewProps {
  key?: string;
  data: DataDto;
  onDelete: (id: number) => void;
}
const ChartPreview = (props: ChartPreviewProps) => {
  const { data, onDelete } = props;

  const chartOptions: any = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: data.name,
      },
    },
  };

  const optimizeDate = (dates: Date[]) => {
    return dates.map((date) => {
      return dateFormat(date, "dd:mm:yyyy HH:MM");
    });
  };

  const chartData = {
    labels: optimizeDate(data.storageData.map((storage) => storage.date)),

    datasets: [
      {
        label: "Value",
        data: data.storageData.map((storage) => storage.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Card style={{ width: "18rem" }} className="text-center m-2">
      <Card.Body>
        <Stack gap={2}>
          <Card.Title>{data.name}</Card.Title>
          <Line
            style={{ height: "300px" }}
            height={300}
            options={chartOptions}
            data={chartData}
          />
          <Button href={data.url} variant="primary">
            Go to page
          </Button>
          <Button onClick={() => onDelete(data.id)} variant="danger">
            Remove
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
export default ChartPreview;
