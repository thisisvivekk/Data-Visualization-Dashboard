import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getIntensityData = () => {
    const intensityCounts = {};
    data.forEach(item => {
      if (intensityCounts[item.intensity]) {
        intensityCounts[item.intensity] += 1;
      } else {
        intensityCounts[item.intensity] = 1;
      }
    });

    const intensityLabels = Object.keys(intensityCounts);
    const intensityData = Object.values(intensityCounts);

    return {
      labels: intensityLabels,
      datasets: [
        {
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
      ]
    };
  };

  const getLikelihoodData = () => {
    const likelihoodCounts = {};
    data.forEach(item => {
      if (likelihoodCounts[item.likelihood]) {
        likelihoodCounts[item.likelihood] += 1;
      } else {
        likelihoodCounts[item.likelihood] = 1;
      }
    });

    const likelihoodLabels = Object.keys(likelihoodCounts);
    const likelihoodData = Object.values(likelihoodCounts);

    return {
      labels: likelihoodLabels,
      datasets: [
        {
          label: 'Likelihood',
          data: likelihoodData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }
      ]
    };
  };

  const getRelevanceData = () => {
    const relevanceCounts = {};
    data.forEach(item => {
      if (relevanceCounts[item.relevance]) {
        relevanceCounts[item.relevance] += 1;
      } else {
        relevanceCounts[item.relevance] = 1;
      }
    });

    const relevanceLabels = Object.keys(relevanceCounts);
    const relevanceData = Object.values(relevanceCounts);

    return {
      labels: relevanceLabels,
      datasets: [
        {
          label: 'Relevance',
          data: relevanceData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }
      ]
    };
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <div>
            <h2>Intensity Chart</h2>
            <Bar data={getIntensityData()} />
          </div>
          <div>
            <h2>Likelihood Chart</h2>
            <Bar data={getLikelihoodData()} />
          </div>
          <div>
            <h2>Relevance Chart</h2>
            <Bar data={getRelevanceData()} />
          </div>
        </div>
      )}
    </div>
  );
};
export default App;