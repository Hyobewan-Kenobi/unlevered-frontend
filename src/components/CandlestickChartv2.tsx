import React, { Component } from "react";
import Chart from "react-apexcharts";
import { parseCSVData } from '../lib/parseCSV';

const sampleCSVData = `Date,Open,High,Low,Close,Adj Close,Volume
2023-06-12,181.270004,183.889999,180.970001,183.789993,182.819077,54274900
2023-06-13,182.800003,184.149994,182.440002,183.309998,182.341629,54929100
2023-06-14,183.369995,184.389999,182.020004,183.949997,182.978241,57462900
2023-06-15,183.960007,186.520004,183.779999,186.009995,185.027359,65433200
2023-06-16,186.729996,186.990005,184.270004,184.919998,183.943115,101235600
2023-06-20,184.410004,186.100006,184.410004,185.009995,184.032639,49799100
2023-06-21,184.899994,185.410004,182.589996,183.960007,182.98819,49515700
2023-06-22,183.740005,187.050003,183.669998,187,186.012146,51245300
2023-06-23,185.550003,187.559998,185.009995,186.679993,185.693817,53079300
2023-06-26,186.830002,188.050003,185.229996,185.270004,184.291275,48088700
2023-06-27,185.889999,188.389999,185.669998,188.059998,187.066513,50730800
2023-06-28,187.929993,189.899994,187.600006,189.25,188.250244,51216800
2023-06-29,189.080002,190.070007,188.940002,189.589996,188.58844,46347300
2023-06-30,191.630005,194.479996,191.259995,193.970001,192.945328,85069600
2023-07-03,193.779999,193.880005,191.759995,192.460007,191.443298,31458200
2023-07-05,191.570007,192.979996,190.619995,191.330002,190.31926,46920300
2023-07-06,189.839996,192.020004,189.199997,191.809998,190.796707,45094300
2023-07-07,191.410004,192.669998,190.240005,190.679993,189.672668,46778000
2023-07-10,189.259995,189.990005,187.039993,188.610001,187.613647,59922200
2023-07-11,189.160004,189.300003,186.600006,188.080002,187.086456,46638100
2023-07-12,189.679993,191.699997,188.470001,189.770004,188.767502,60750200
2023-07-13,190.5,191.190002,189.779999,190.539993,189.533417,41342300
2023-07-14,190.229996,191.179993,189.630005,190.690002,189.682648,41573900
2023-07-17,191.899994,194.320007,191.809998,193.990005,192.96521,50520200
2023-07-18,193.350006,194.330002,192.419998,193.729996,192.706573,48353800
2023-07-19,193.100006,198.229996,192.649994,195.100006,194.069351,80507300
2023-07-20,195.089996,196.470001,192.5,193.130005,192.109772,59581200
2023-07-21,194.100006,194.970001,191.229996,191.940002,190.926056,71917800
2023-07-24,193.410004,194.910004,192.25,192.75,191.73175,45377800
2023-07-25,193.330002,194.440002,192.919998,193.619995,192.597168,37283200
2023-07-26,193.669998,195.639999,193.320007,194.5,193.472519,47471900
2023-07-27,196.020004,197.199997,192.550003,193.220001,192.19928,47460200
2023-07-28,194.669998,196.630005,194.139999,195.830002,194.795502,48291400
2023-07-31,196.059998,196.490005,195.259995,196.449997,195.412216,38824100
2023-08-01,196.240005,196.729996,195.279999,195.610001,194.576645,35175100
2023-08-02,195.039993,195.179993,191.850006,192.580002,191.562637,50389300
2023-08-03,191.570007,192.369995,190.690002,191.169998,190.16011,61235200
2023-08-04,185.520004,187.380005,181.919998,181.990005,181.02861,115799700
2023-08-07,182.130005,183.130005,177.350006,178.850006,177.905182,97576100
2023-08-08,179.690002,180.270004,177.580002,179.800003,178.850159,67823000
2023-08-09,180.869995,180.929993,177.009995,178.190002,177.248657,60378500
2023-08-10,179.479996,180.75,177.600006,177.970001,177.029846,54686900
2023-08-11,177.320007,178.619995,176.550003,177.789993,177.0896,51988100
2023-08-14,177.970001,179.690002,177.309998,179.460007,178.753036,43675600
2023-08-15,178.880005,179.479996,177.050003,177.449997,176.750946,43622600
2023-08-16,177.130005,178.539993,176.5,176.570007,175.87442,46964900
2023-08-17,177.139999,177.509995,173.479996,174,173.314529,66062900
2023-08-18,172.300003,175.100006,171.960007,174.490005,173.802612,61114200
2023-08-21,175.070007,176.130005,173.740005,175.839996,175.147278,46311900
2023-08-22,177.059998,177.679993,176.25,177.229996,176.531799,42084200
2023-08-23,178.520004,181.550003,178.330002,181.119995,180.406479,52722800
2023-08-24,180.669998,181.100006,176.009995,176.380005,175.68515,54945800
2023-08-25,177.380005,179.149994,175.820007,178.610001,177.906372,51449600
2023-08-28,180.089996,180.589996,178.550003,180.190002,179.480164,43820700
2023-08-29,179.699997,184.899994,179.5,184.119995,183.394653,53003900
2023-08-30,184.940002,187.850006,184.740005,187.649994,186.910751,60813900
2023-08-31,187.839996,189.119995,187.479996,187.869995,187.129898,60794500
2023-09-01,189.490005,189.919998,188.279999,189.460007,188.713654,45732600
2023-09-05,188.279999,189.979996,187.610001,189.699997,188.952698,45280000
2023-09-06,188.399994,188.850006,181.470001,182.910004,182.189438,81755800
2023-09-07,175.179993,178.210007,173.539993,177.559998,176.860519,112488800
2023-09-08,178.350006,180.240005,177.789993,178.179993,177.478058,65551300
2023-09-11,180.070007,180.300003,177.339996,179.360001,178.653412,58953100
2023-09-12,179.490005,180.130005,174.820007,176.300003,175.605484,90370200
2023-09-13,176.509995,177.300003,173.979996,174.210007,173.523712,84267900
2023-09-14,174,176.100006,173.580002,175.740005,175.047684,60895800
2023-09-15,176.479996,176.5,173.820007,175.009995,174.320541,109205100
2023-09-18,176.479996,179.380005,176.169998,177.970001,177.26889,67257600
2023-09-19,177.520004,179.630005,177.130005,179.070007,178.364563,51826900
2023-09-20,179.259995,179.699997,175.399994,175.490005,174.79866,58436200
2023-09-21,174.550003,176.300003,173.860001,173.929993,173.244812,63047900
2023-09-22,174.669998,177.080002,174.050003,174.789993,174.10141,56725400
2023-09-25,174.199997,176.970001,174.149994,176.080002,175.386337,46172700
2023-09-26,174.820007,175.199997,171.660004,171.960007,171.282562,64588900
2023-09-27,172.619995,173.039993,169.050003,170.429993,169.758591,66921800
2023-09-28,169.339996,172.029999,167.619995,170.690002,170.017578,56294400
2023-09-29,172.020004,173.070007,170.339996,171.210007,170.535538,51814200
2023-10-02,171.220001,174.300003,170.929993,173.75,173.065521,52164500
2023-10-03,172.259995,173.630005,170.820007,172.399994,171.72084,49594600
2023-10-04,171.089996,174.210007,170.970001,173.660004,172.975891,53020300
2023-10-05,173.789993,175.449997,172.679993,174.910004,174.220963,48527900
2023-10-06,173.800003,177.990005,173.179993,177.490005,176.790802,57224100
2023-10-09,176.809998,179.050003,175.800003,178.990005,178.284882,42390800
2023-10-10,178.100006,179.720001,177.949997,178.389999,177.687241,43698000
2023-10-11,178.199997,179.850006,177.600006,179.800003,179.091675,47551100
2023-10-12,180.070007,182.339996,179.039993,180.710007,179.998108,56743100
2023-10-13,181.419998,181.929993,178.139999,178.850006,178.145416,51427100
2023-10-16,176.75,179.080002,176.509995,178.720001,178.015945,52517000
2023-10-17,176.649994,178.419998,174.800003,177.149994,176.452118,57549400
2023-10-18,175.580002,177.580002,175.110001,175.839996,175.147278,54764400
2023-10-19,176.039993,177.839996,175.190002,175.460007,174.768799,59302900
2023-10-20,175.309998,175.419998,172.639999,172.880005,172.198959,64189300
2023-10-23,170.910004,174.009995,169.929993,173,172.318481,55980100
2023-10-24,173.050003,173.669998,171.449997,173.440002,172.756744,43816600
2023-10-25,171.880005,173.059998,170.649994,171.100006,170.42598,57157000
2023-10-26,170.369995,171.380005,165.669998,166.889999,166.232559,70625300
2023-10-27,166.910004,168.960007,166.830002,168.220001,167.557312,58499100
2023-10-30,169.020004,171.169998,168.869995,170.289993,169.619125,51131000
2023-10-31,169.350006,170.899994,167.899994,170.770004,170.09726,44846000
2023-11-01,171,174.229996,170.119995,173.970001,173.284653,56934900
2023-11-02,175.520004,177.779999,175.460007,177.570007,176.870483,77334800
2023-11-03,174.240005,176.820007,173.350006,176.649994,175.954086,79763700
2023-11-06,176.380005,179.429993,176.210007,179.229996,178.523941,63841300
2023-11-07,179.179993,182.440002,178.970001,181.820007,181.103729,70530000
2023-11-08,182.350006,183.449997,181.589996,182.889999,182.16951,49340300
2023-11-09,182.960007,184.119995,181.809998,182.410004,181.691406,53763500
2023-11-10,183.970001,186.570007,183.529999,186.399994,185.910278,66133400
2023-11-13,185.820007,186.029999,184.210007,184.800003,184.314484,43627500
2023-11-14,187.699997,188.110001,186.300003,187.440002,186.947556,60108400
2023-11-15,187.850006,189.5,187.779999,188.009995,187.516052,53790500
2023-11-16,189.570007,190.960007,188.649994,189.710007,189.211609,54412900
2023-11-17,190.25,190.380005,188.570007,189.690002,189.19165,50922700
2023-11-20,189.889999,191.910004,189.880005,191.449997,190.947021,46505100
2023-11-21,191.410004,191.520004,189.740005,190.639999,190.139145,38134500
2023-11-22,191.490005,192.929993,190.830002,191.309998,190.807404,39617700
2023-11-24,190.869995,190.899994,189.25,189.970001,189.470901,24048300
2023-11-27,189.919998,190.669998,188.899994,189.789993,189.291367,40552600
2023-11-28,189.779999,191.080002,189.399994,190.399994,189.899765,38415400
2023-11-29,190.899994,192.089996,188.970001,189.369995,188.872482,43014200
2023-11-30,189.839996,190.320007,188.190002,189.949997,189.450958,48794400
2023-12-01,190.330002,191.559998,189.229996,191.240005,190.737579,45679300
2023-12-04,189.979996,190.050003,187.449997,189.429993,188.932312,43389500
2023-12-05,190.210007,194.399994,190.179993,193.419998,192.91185,66628400
2023-12-06,194.449997,194.759995,192.110001,192.320007,191.814743,41089700
2023-12-07,193.630005,195,193.589996,194.270004,193.759628,47477700
2023-12-08,194.199997,195.990005,193.669998,195.710007,195.195847,53377300
2023-12-11,193.110001,193.490005,191.419998,193.179993,192.672485,60943700
2023-12-12,193.080002,194.720001,191.720001,194.710007,194.198471,52696900
2023-12-13,195.089996,198,194.850006,197.960007,197.439926,70404200
2023-12-14,198.020004,199.619995,196.160004,198.110001,197.589523,66831600
2023-12-15,197.529999,198.399994,197,197.570007,197.050949,128256700
2023-12-18,196.089996,196.630005,194.389999,195.889999,195.375366,55751900
2023-12-19,196.160004,196.949997,195.889999,196.940002,196.422607,40714100
2023-12-20,196.899994,197.679993,194.830002,194.830002,194.318146,52242800
2023-12-21,196.100006,197.080002,193.5,194.679993,194.168518,46482500
2023-12-22,195.179993,195.410004,192.970001,193.600006,193.091385,37122800
2023-12-26,193.610001,193.889999,192.830002,193.050003,192.542816,28919300
2023-12-27,192.490005,193.5,191.089996,193.149994,192.642548,48087700
2023-12-28,194.139999,194.660004,193.169998,193.580002,193.071426,34049900
2023-12-29,193.899994,194.399994,191.729996,192.529999,192.024185,42628800
2024-01-02,187.149994,188.440002,183.889999,185.639999,185.152283,82488700
2024-01-03,184.220001,185.880005,183.429993,184.25,183.76593,58414500
2024-01-04,182.149994,183.089996,180.880005,181.910004,181.432098,71983600
2024-01-05,181.990005,182.759995,180.169998,181.179993,180.703995,62303300
2024-01-08,182.089996,185.600006,181.5,185.559998,185.072495,59144500
2024-01-09,183.919998,185.149994,182.729996,185.139999,184.653595,42841800
2024-01-10,184.350006,186.399994,183.919998,186.190002,185.700851,46792900
2024-01-11,186.539993,187.050003,183.619995,185.589996,185.102417,49128400
2024-01-12,186.059998,186.740005,185.190002,185.919998,185.431549,40444700
2024-01-16,182.160004,184.259995,180.929993,183.630005,183.147568,65603000
2024-01-17,181.270004,182.929993,180.300003,182.679993,182.200058,47317400
2024-01-18,186.089996,189.139999,185.830002,188.630005,188.13443,78005800
2024-01-19,189.330002,191.949997,188.820007,191.559998,191.056732,68741000
2024-01-22,192.300003,195.330002,192.259995,193.889999,193.3806,60133900
2024-01-23,195.020004,195.75,193.830002,195.179993,194.667221,42355600
2024-01-24,195.419998,196.380005,194.339996,194.5,193.988998,53631300
2024-01-25,195.220001,196.270004,193.110001,194.169998,193.659882,54822100
2024-01-26,194.270004,194.759995,191.940002,192.419998,191.914474,44594000
2024-01-29,192.009995,192.199997,189.580002,191.729996,191.226273,47145600
2024-01-30,190.940002,191.800003,187.470001,188.039993,187.545975,55859400
2024-01-31,187.039993,187.100006,184.350006,184.399994,183.915543,55467800
2024-02-01,183.990005,186.949997,183.820007,186.860001,186.369095,64885400
2024-02-02,179.860001,187.330002,179.25,185.850006,185.36174,102518000
2024-02-05,188.149994,189.25,185.839996,187.679993,187.18692,69668800
2024-02-06,186.860001,189.309998,186.770004,189.300003,188.802673,43490800
2024-02-07,190.639999,191.050003,188.610001,189.410004,188.912384,53439000
2024-02-08,189.389999,189.539993,187.350006,188.320007,187.825256,40962000
2024-02-09,188.649994,189.990005,188,188.850006,188.594208,45155200
2024-02-12,188.419998,188.669998,186.789993,187.149994,186.8965,41781900
2024-02-13,185.770004,186.210007,183.509995,185.039993,184.789352,56529500
2024-02-14,185.320007,185.529999,182.440002,184.149994,183.900558,54630500
2024-02-15,183.550003,184.490005,181.350006,183.860001,183.610962,65434500
2024-02-16,183.419998,184.850006,181.669998,182.309998,182.063049,49701400
2024-02-20,181.789993,182.429993,180,181.559998,181.314072,53665600
2024-02-21,181.940002,182.889999,180.660004,182.320007,182.073059,41529700
2024-02-22,183.479996,184.960007,182.460007,184.369995,184.12027,52292200
2024-02-23,185.009995,185.039993,182.229996,182.520004,182.272781,45119700
2024-02-26,182.240005,182.759995,180.649994,181.160004,180.914627,40867400
2024-02-27,181.100006,183.919998,179.559998,182.630005,182.382629,54318900
2024-02-28,182.509995,183.119995,180.130005,181.419998,181.174255,48953900
2024-02-29,181.270004,182.570007,179.529999,180.75,180.505173,136682600
2024-03-01,179.550003,180.529999,177.380005,179.660004,179.416656,73488000
2024-03-04,176.149994,176.899994,173.789993,175.100006,174.862823,81510100
2024-03-05,170.759995,172.039993,169.619995,170.119995,169.889572,95132400
2024-03-06,171.059998,171.240005,168.679993,169.119995,168.890915,68587700
2024-03-07,169.149994,170.729996,168.490005,169,168.771088,71765100
2024-03-08,169,173.699997,168.940002,170.729996,170.498734,76114600
2024-03-11,172.940002,174.380005,172.050003,172.75,172.516006,60139500
2024-03-12,173.149994,174.029999,171.009995,173.229996,172.995346,59825400
2024-03-13,172.770004,173.190002,170.759995,171.130005,170.898209,52488700
2024-03-14,172.910004,174.309998,172.050003,173,172.765671,72913500
2024-03-15,171.169998,172.619995,170.289993,172.619995,172.386185,121664700
2024-03-18,175.570007,177.710007,173.520004,173.720001,173.484695,75604200
2024-03-19,174.339996,176.610001,173.029999,176.080002,175.841492,55215200
2024-03-20,175.720001,178.669998,175.089996,178.669998,178.427994,53423100
2024-03-21,177.050003,177.490005,170.839996,171.369995,171.137878,106181300
2024-03-22,171.759995,173.050003,170.059998,172.279999,172.046646,71106600
2024-03-25,170.570007,171.940002,169.449997,170.850006,170.618591,54288300
2024-03-26,170,171.419998,169.580002,169.710007,169.480133,57388400
2024-03-27,170.410004,173.600006,170.110001,173.309998,173.075241,60273300
2024-03-28,171.75,172.229996,170.509995,171.479996,171.247726,65672700
2024-04-01,171.190002,171.25,169.479996,170.029999,169.799698,46240500
2024-04-02,169.080002,169.339996,168.229996,168.839996,168.611298,49329500
2024-04-03,168.789993,170.679993,168.580002,169.649994,169.420197,47691700
2024-04-04,170.289993,171.919998,168.820007,168.820007,168.591339,53704400
2024-04-05,169.589996,170.389999,168.949997,169.580002,169.350296,42055200
2024-04-08,169.029999,169.199997,168.240005,168.449997,168.221832,37425500
2024-04-09,168.699997,170.080002,168.350006,169.669998,169.44017,42451200
2024-04-10,168.800003,169.089996,167.110001,167.779999,167.552734,49709300
2024-04-11,168.339996,175.460007,168.160004,175.039993,174.802902,91070300
2024-04-12,174.259995,178.360001,174.210007,176.550003,176.310867,101593300
2024-04-15,175.360001,176.630005,172.5,172.690002,172.456085,73531800
2024-04-16,171.75,173.759995,168.270004,169.380005,169.150574,73711200
2024-04-17,169.610001,170.649994,168,168,167.772446,50901200
2024-04-18,168.029999,168.639999,166.550003,167.039993,166.813736,43122900
2024-04-19,166.210007,166.399994,164.080002,165,164.776505,67772100
2024-04-22,165.520004,167.259995,164.770004,165.839996,165.615356,48116400
2024-04-23,165.350006,167.050003,164.919998,166.899994,166.67392,49537800
2024-04-24,166.539993,169.300003,166.210007,169.020004,168.791061,48251800
2024-04-25,169.529999,170.610001,168.149994,169.889999,169.659882,50558300
2024-04-26,169.880005,171.339996,169.179993,169.300003,169.070679,44838400
2024-04-29,173.369995,176.029999,173.100006,173.5,173.264984,68169400
2024-04-30,173.330002,174.990005,170,170.330002,170.099289,65934800
2024-05-01,169.580002,172.710007,169.110001,169.300003,169.070679,50383100
2024-05-02,172.509995,173.419998,170.889999,173.029999,172.795624,94214900
2024-05-03,186.649994,187,182.660004,183.380005,183.131607,163224100
2024-05-06,182.350006,184.199997,180.419998,181.710007,181.463882,78569700
2024-05-07,183.449997,184.899994,181.320007,182.399994,182.152924,77305800
2024-05-08,182.850006,183.070007,181.449997,182.740005,182.492477,45057100
2024-05-09,182.559998,184.660004,182.110001,184.570007,184.320007,48983000
2024-05-10,184.899994,185.089996,182.130005,183.050003,183.050003,50759500
2024-05-13,185.440002,187.100006,184.619995,186.279999,186.279999,72044800
2024-05-14,187.509995,188.300003,186.289993,187.429993,187.429993,52393600
2024-05-15,187.910004,190.649994,187.369995,189.720001,189.720001,70400000
2024-05-16,190.470001,191.100006,189.660004,189.839996,189.839996,52845200
2024-05-17,189.509995,190.809998,189.179993,189.869995,189.869995,41282900
2024-05-20,189.330002,191.919998,189.009995,191.039993,191.039993,44361300
2024-05-21,191.089996,192.729996,190.919998,192.350006,192.350006,42309400
2024-05-22,192.270004,192.820007,190.270004,190.899994,190.899994,34648500
2024-05-23,190.979996,191,186.630005,186.880005,186.880005,51005900
2024-05-24,188.820007,190.580002,188.039993,189.979996,189.979996,36294600
2024-05-28,191.509995,193,189.100006,189.990005,189.990005,52280100
2024-05-29,189.610001,192.25,189.509995,190.289993,190.289993,53068000
2024-05-30,190.759995,192.179993,190.630005,191.289993,191.289993,49947900
2024-05-31,191.440002,192.570007,189.910004,192.25,192.25,75158300
2024-06-03,192.899994,194.990005,192.520004,194.029999,194.029999,50080500
2024-06-04,194.639999,195.320007,193.029999,194.350006,194.350006,47471400
2024-06-05,195.399994,196.899994,194.869995,195.869995,195.869995,54156800
2024-06-06,195.690002,196.5,194.169998,194.479996,194.479996,41181800
2024-06-07,194.649994,196.940002,194.139999,196.889999,196.889999,53044700
2024-06-10,197.199997,197.280106,194.830002,195.529999,195.529999,20923612`;

const parsedData = parseCSVData(sampleCSVData);
console.log(parsedData);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "candlestick",
          height: '500px'
        },
        xaxis: {
            type: 'datetime'
        }
      },
      series: [
        {
          name: "series-1",
          data: parsedData
        }
      ]
    };
  }

  render() {
    return (
      <div className="app m-12">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;