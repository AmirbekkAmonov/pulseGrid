import { useRef, useEffect, useMemo, useCallback } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';

import Logo from '../../../assets/images/PulseLogo.svg';

function HeroImg() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const chartRef3 = useRef<HTMLDivElement>(null);
  const chartRef4 = useRef<HTMLDivElement>(null);

  // trendli data generator (boshlanish 0 ga yaqin, keyin ko'tarilib-tushib davom etadi)
  function generateTrendData(points = 300) {
    let value = 20;
    const data: number[] = [];

    for (let i = 0; i < points; i++) {
      // mayda random shovqin
      value += Math.random() * 4 - 2;

      // umumiy trend sekin yuqoriga
      value += 0.05;

      if (value < 0) value = 0;
      data.push(Math.round(value));
    }

    return data;
  }

  const generateSmoothWave = (points = 100) => {
    const data: number[] = [];

    for (let i = 0; i < points; i++) {
      const y = Math.sin(i / 15) * 20 + Math.cos(i / 30) * 10 + i * 0.2;
      data.push(y); // ❌ Math.round olib tashlandi
    }

    return data;
  };

  // random data generator
  function generateVolatileData(points = 200) {
    const center: number[] = [];
    const upper: number[] = [];
    const lower: number[] = [];
    const spikeUp: number[] = [];
    const spikeDown: number[] = [];

    for (let i = 0; i < points; i++) {
      const base = 0;
      center.push(base);

      // #6092A5 → faqat tepaga
      let up = Math.random() > 0.85 ? base + (Math.random() * 80 + 20) : base;

      // ❗ Ba'zida juda katta sakrash (max spike)
      if (Math.random() > 0.97) {
        up += Math.random() * 150 + 100; // 100..250 katta jump
      }

      upper.push(up);

      // #A4574C → bu #6092A5 ning aksi (soyasi)
      lower.push(base - (up - base));

      // #9A4DFF spike yuqori
      let spike =
        Math.random() > 0.85 ? base + (Math.random() * 80 + 20) : base;

      // ❗ Spikelar ham max sakrashli bo'lsin
      if (Math.random() > 0.97) {
        spike += Math.random() * 200 + 150; // 150..350 super spike
      }

      spikeUp.push(spike);

      // #9A4DFF spike pastki aksi
      const spikeMirror = base - (spike - base);
      spikeDown.push(spikeMirror);
    }

    return { center, upper, lower, spikeUp, spikeDown };
  }

  // sinus to'lqinli ko'p seriya generatori
  function generateMultiWave(points = 200, series = 3) {
    const allSeries: number[][] = [];

    for (let s = 0; s < series; s++) {
      const data: number[] = [];
      const freq = 0.02 + Math.random() * 0.02; // chastota
      const amp = 30 + Math.random() * 40; // amplituda
      const phase = Math.random() * Math.PI * 2; // faza

      for (let i = 0; i < points; i++) {
        const value = Math.sin(i * freq + phase) * amp;
        data.push(Number(value.toFixed(2)));
      }
      allSeries.push(data);
    }

    return allSeries;
  }

  // Data ni bir marta generatsiya qilib saqlash - chartlar qayta yangilanmasligi uchun
  const chartData = useMemo(
    () => ({
      trendData: generateTrendData(),
      smoothWaveData: generateSmoothWave(),
      volatileData: generateVolatileData(300),
      multiWaveData: generateMultiWave(300, 3),
    }),
    []
  );

  // Chart yaratish funksiyalari
  const createTrendChart = useCallback(
    (chartRef: React.RefObject<HTMLDivElement | null>, data: number[]) => {
      if (!chartRef.current) return;

      const myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: {
          type: 'category',
          data: data.map((_, index) => index),
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            type: 'line',
            data: data,
            lineStyle: { color: '#5794F2', width: 2 }, // 🔵 ko'k chiziq
            symbol: 'none',
          },
        ],
      });
      return myChart;
    },
    []
  );

  const createSmoothWaveChart = useCallback(
    (chartRef: React.RefObject<HTMLDivElement | null>, data: number[]) => {
      if (!chartRef.current) return;

      const myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: {
          type: 'category',
          data: data.map((_, index) => index),
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: data,
            lineStyle: { color: '#4DFF4D', width: 2 }, // 🔵 ko'k chiziq
            symbol: 'none',
          },
        ],
      });
      return myChart;
    },
    []
  );

  const createVolatileChart = useCallback(
    (chartRef: React.RefObject<HTMLDivElement | null>) => {
      if (!chartRef.current) return;

      const myChart = echarts.init(chartRef.current);
      const { center, upper, lower, spikeUp, spikeDown } =
        generateVolatileData(200);

      const maxLen = center.length;

      myChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: {
          type: 'category',
          data: Array.from({ length: maxLen }, (_, i) => i),
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [
          // O'rta chiziq
          {
            type: 'line',
            data: center,
            smooth: false,
            lineStyle: { color: 'transparent', width: 1.5 },
            symbol: 'none',
            z: 1,
          },
          // Tepada (#6092A5) → faqat yuqorida
          {
            type: 'line',
            data: upper,
            smooth: false,
            lineStyle: { color: '#6092A5', width: 2 },
            symbol: 'none',
            z: 2,
          },
          // Pastki aksi (#A4574C)
          {
            type: 'line',
            data: lower,
            smooth: false,
            lineStyle: { color: '#A4574C', width: 2 },
            symbol: 'none',
            z: 2,
          },
          // Yuqori spike (#9A4DFF)
          {
            type: 'line',
            data: spikeUp,
            smooth: false,
            lineStyle: { color: '#9A4DFF', width: 1.5 },
            symbol: 'none',
            z: 3,
          },
          // Pastki spike (#9A4DFF)
          {
            type: 'line',
            data: spikeDown,
            smooth: false,
            lineStyle: { color: '#9A4DFF', width: 1.5 },
            symbol: 'none',
            z: 3,
          },
        ],
      });

      return myChart;
    },
    []
  );

  const createMultiWaveChart = useCallback(
    (chartRef: React.RefObject<HTMLDivElement | null>, data: number[][]) => {
      if (!chartRef.current) return;

      const myChart = echarts.init(chartRef.current);
      const maxLen = Math.max(...data.map((s) => s.length));

      myChart.setOption({
        grid: { left: 0, right: 0, top: 0, bottom: 0 },
        xAxis: {
          type: 'category',
          data: Array.from({ length: maxLen }, (_, i) => i),
          show: false,
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: data.map((series, index) => ({
          type: 'line',
          data: series,
          smooth: true, // silliq sinus chizish
          lineStyle: {
            width: 2,
            color: ['#5C938A', '#D79133', '#DE6E4E'][index % 3], // ranglar
          },
          symbol: 'none',
        })),
      });
      return myChart;
    },
    []
  );

  useEffect(() => {
    const myChart = createTrendChart(chartRef, chartData.trendData);

    if (myChart) {
      // resize bo'lganda ham ishlashi uchun
      const resizeListener = () => myChart.resize();
      window.addEventListener('resize', resizeListener, { passive: true });

      return () => {
        window.removeEventListener('resize', resizeListener);
        myChart.dispose();
      };
    }
  }, [createTrendChart, chartData.trendData]);

  useEffect(() => {
    const myChart = createSmoothWaveChart(chartRef2, chartData.smoothWaveData);

    if (myChart) {
      const resizeListener = () => myChart.resize();
      window.addEventListener('resize', resizeListener, { passive: true });

      return () => {
        window.removeEventListener('resize', resizeListener);
        myChart.dispose();
      };
    }
  }, [createSmoothWaveChart, chartData.smoothWaveData]);

  useEffect(() => {
    const myChart = createVolatileChart(chartRef3);

    if (myChart) {
      const resizeListener = () => myChart.resize();
      window.addEventListener('resize', resizeListener, { passive: true });

      return () => {
        window.removeEventListener('resize', resizeListener);
        myChart.dispose();
      };
    }
  }, [createVolatileChart, chartData.volatileData]);

  useEffect(() => {
    const myChart = createMultiWaveChart(chartRef4, chartData.multiWaveData);

    if (myChart) {
      const resizeListener = () => myChart.resize();
      window.addEventListener('resize', resizeListener, { passive: true });

      return () => {
        window.removeEventListener('resize', resizeListener);
        myChart.dispose();
      };
    }
  }, [createMultiWaveChart, chartData.multiWaveData]);

  const cardContentVariants = {
    hidden: {
      opacity: 0,
      x: 40, // O'ngdan keladi (right→left)
    },
    visible: {
      opacity: 1,
      x: 0, // O'z joyiga keladi
      transition: {
        duration: 0.3, // 300ms
        ease: 'easeOut' as const,
      },
    },
  };

  const chartVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      x: 30, // O'ngdan keladi (right→left)
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0, // O'z joyiga keladi
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      className="landing-hero-img"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div className="landing-hero-img__header">
        <motion.div
          className="cricles"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="cricle"
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.3, ease: 'easeOut' }}
          ></motion.div>
          <motion.div
            className="cricle"
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.3, ease: 'easeOut' }}
          ></motion.div>
          <motion.div
            className="cricle"
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.3, ease: 'easeOut' }}
          ></motion.div>
        </motion.div>
      </motion.div>

      <div className="landing-hero-img__body">
        <motion.div className="landing-hero-img__body-sidebar">
          <motion.div
            className="landing-hero-img__body-sidebar-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.25 }}
          >
            <motion.img
              src={Logo}
              alt="logo"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="sidebar-menu"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="sidebar-menu"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.15, duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="sidebar-menu"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="sidebar-menu"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, duration: 0.25, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.div
            className="landing-hero-img__body-sidebar-bottom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.25 }}
          >
            <motion.div
              className="sidebar-menu"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.35, duration: 0.25, ease: 'easeOut' }}
            />
            <motion.div
              className="sidebar-menu cricle"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.25, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>

        <div className="landing-hero-img__body-main">
          <motion.div
            className="landing-hero-img__body-main-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.25, duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="main-menu active"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.45, duration: 0.3, ease: 'easeOut' }}
            >
              <motion.div
                className="main-menu-child"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.25, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.div
              className="main-menu left"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.52, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.54, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.56, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.58, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.62, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.64, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.66, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.68, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.72, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.74, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.76, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.78, duration: 0.3, ease: 'easeOut' }}
            />
            <motion.div
              className="main-menu left2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>

          <div className="landing-hero-img__body-main-right-container">
            <div className="landing-hero-img__body-main-left">
              <motion.div
                className="landing-hero-img__body-main-left-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.85, duration: 0.3 }}
              >
                <motion.div
                  className="menu-card w60"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.35, ease: 'easeOut' }}
                >
                  <motion.div
                    className="header"
                    variants={cardContentVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.95 }}
                  >
                    <motion.div
                      className="header-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.0, duration: 0.25 }}
                    />
                    <motion.div
                      className="header-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.02, duration: 0.25 }}
                    />
                  </motion.div>
                  <motion.div
                    className="body-chart"
                    ref={chartRef}
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.75 }}
                  >
                    <div className="body-chart-line"></div>
                  </motion.div>
                  <motion.div
                    className="footer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                  >
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.85, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.87, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.89, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="menu-card"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.35, ease: 'easeOut' }}
                >
                  <motion.div
                    className="header"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.95, duration: 0.3 }}
                  >
                    <motion.div
                      className="header-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.0, duration: 0.25 }}
                    />
                    <motion.div
                      className="header-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.02, duration: 0.25 }}
                    />
                  </motion.div>
                  <motion.div
                    className="body-chart"
                    ref={chartRef2}
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.7 }}
                  ></motion.div>
                  <motion.div
                    className="footer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9, duration: 0.3 }}
                  >
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.95, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#4DFF4D' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.97, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.99, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="landing-hero-img__body-main-left-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.3 }}
              >
                <motion.div
                  className="menu-card w100"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 2.05, duration: 0.35, ease: 'easeOut' }}
                >
                  <motion.div
                    className="header"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.1, duration: 0.3 }}
                  >
                    <motion.div
                      className="header-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.15, duration: 0.25 }}
                    />
                    <motion.div
                      className="header-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.17, duration: 0.25 }}
                    />
                  </motion.div>
                  <motion.div
                    className="body-chart"
                    ref={chartRef3}
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.8 }}
                  ></motion.div>
                  <motion.div
                    className="footer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.25, duration: 0.3 }}
                  >
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.3, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#6092A5' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.32, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.34, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.36, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#9A4DFF' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.38, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.4, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.42, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle "
                        style={{ backgroundColor: '#A4574C' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.44, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.46, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="landing-hero-img__body-main-left-bottom"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.3 }}
              >
                <motion.div
                  className="menu-card h100"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 2.55, duration: 0.35, ease: 'easeOut' }}
                >
                  <motion.div
                    className="header h100"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.6, duration: 0.3 }}
                  >
                    <motion.div
                      className="header-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.65, duration: 0.25 }}
                    />
                    <motion.div
                      className="header-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.67, duration: 0.25 }}
                    />
                  </motion.div>
                  <motion.div
                    className="body-line h100"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.7, duration: 0.35 }}
                  >
                    <motion.div
                      className="body-line-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.75, duration: 0.3 }}
                    >
                      <motion.div
                        className="line"
                        style={{ width: '20%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.8, duration: 0.25 }}
                      />
                      <motion.div
                        className="line"
                        style={{ width: '50%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.82, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="body-line-item-line"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.84, duration: 0.2 }}
                    />
                    <motion.div
                      className="body-line-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.86, duration: 0.3 }}
                    >
                      <motion.div
                        className="line"
                        style={{ width: '40%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.88, duration: 0.25 }}
                      />
                      <motion.div
                        className="line"
                        style={{ width: '30%', marginRight: '10px' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.9, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="body-line-item-line"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.92, duration: 0.2 }}
                    />
                    <motion.div
                      className="body-line-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.94, duration: 0.3 }}
                    >
                      <motion.div
                        className="line"
                        style={{ width: '30%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.96, duration: 0.25 }}
                      />
                      <motion.div
                        className="line"
                        style={{ width: '45%' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.98, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="footer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.0, duration: 0.3 }}
                  >
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.05, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle red"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.07, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3.09, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="menu-card w60 h100"
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 3, duration: 0.35, ease: 'easeOut' }}
                >
                  <motion.div
                    className="header"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.15, duration: 0.3 }}
                  >
                    <motion.div
                      className="header-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.2, duration: 0.25 }}
                    />
                    <motion.div
                      className="header-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.22, duration: 0.25 }}
                    />
                  </motion.div>
                  <motion.div
                    className="body-chart h100"
                    ref={chartRef4}
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.8 }}
                  ></motion.div>
                  <motion.div
                    className="footer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3.3, duration: 0.3 }}
                  >
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.35, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#5C938A' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.37, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3.39, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.41, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#D79133' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.43, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3.45, duration: 0.25 }}
                      />
                    </motion.div>
                    <motion.div
                      className="footer-item"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.47, duration: 0.25 }}
                    >
                      <motion.div
                        className="cricle"
                        style={{ backgroundColor: '#DE6E4E' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3.49, duration: 0.2 }}
                      />
                      <motion.div
                        className="line"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 3.51, duration: 0.25 }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="landing-hero-img__body-main-right"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 3.1, duration: 0.35, ease: 'easeOut' }}
            >
              <motion.div
                className="landing-hero-img__body-main-right-top"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.05, duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="line-block"
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.2, duration: 0.25, ease: 'easeOut' }}
                >
                  <motion.div
                    className="line active"
                    style={{ width: '75%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.25,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="line"
                    style={{ width: '65%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.27,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="line"
                    style={{ width: '55%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.29,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                </motion.div>
                <motion.div
                  className="line active"
                  style={{ width: '75%' }}
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.31, duration: 0.25, ease: 'easeOut' }}
                ></motion.div>
                <motion.div
                  className="line-block"
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.33, duration: 0.25, ease: 'easeOut' }}
                >
                  <motion.div
                    className="line active"
                    style={{ width: '75%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.35,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="line"
                    style={{ width: '65%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.37,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="line"
                    style={{ width: '55%' }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.39,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="landing-hero-img__body-main-right-center"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.21, duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="line active"
                  style={{ width: '75%' }}
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.45, duration: 0.25, ease: 'easeOut' }}
                ></motion.div>
                <motion.div
                  className="line-block"
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.47, duration: 0.25, ease: 'easeOut' }}
                >
                  <motion.div
                    className="line-row"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.49,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  >
                    <motion.div
                      className="line-row-kub"
                      style={{ backgroundColor: '#F6D15A' }}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.51,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    ></motion.div>
                    <motion.div
                      className="line-row-item"
                      style={{ backgroundColor: '#F6D15A' }}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.53,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    ></motion.div>
                  </motion.div>
                  <motion.div
                    className="line-row"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.55,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  >
                    <motion.div
                      className="line-row-kub"
                      style={{ backgroundColor: '#E76761' }}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.57,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    ></motion.div>
                    <motion.div
                      className="line-row-item"
                      style={{ backgroundColor: '#E76761' }}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.59,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="landing-hero-img__body-main-right-bottom"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.41, duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="line active"
                  style={{ width: '75%' }}
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.65, duration: 0.25, ease: 'easeOut' }}
                ></motion.div>
                <motion.div
                  className="line-block"
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.67, duration: 0.25, ease: 'easeOut' }}
                >
                  <motion.div
                    className="line"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.69,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="grid"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.71,
                      duration: 0.2,
                      ease: 'easeOut',
                    }}
                  >
                    <motion.div
                      className="row"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.73,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.75,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.77,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.79,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex green"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.81,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex green"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.83,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                    </motion.div>
                    <motion.div
                      className="row"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.85,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.87,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.89,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.91,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.93,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="line-block"
                  initial={{ opacity: 0, x: 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.95, duration: 0.25, ease: 'easeOut' }}
                >
                  <motion.div
                    className="line"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.97,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  ></motion.div>
                  <motion.div
                    className="grid"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 3.3,
                      duration: 0.25,
                      ease: 'easeOut',
                    }}
                  >
                    <motion.div
                      className="row"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 3.3,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.35,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.37,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex red"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.39,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex green"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.41,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex green"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 3.43,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                    </motion.div>
                    <motion.div
                      className="row"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 4.1,
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 4.15,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 4.17,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 4.19,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                      <motion.div
                        className="hex gray"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 4.21,
                          duration: 0.15,
                          ease: 'easeOut',
                        }}
                      ></motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroImg;
