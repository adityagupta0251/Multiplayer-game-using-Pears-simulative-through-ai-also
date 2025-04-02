# Bayesian Empirical Likelihood Ratio (BELR) Algorithm

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-green)](https://www.python.org/)

A robust probabilistic classification framework that eliminates feature independence assumptions by directly estimating likelihood ratios from data. Ideal for imbalanced, high-dimensional, or correlated datasets.

---

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Algorithm Overview](#algorithm-overview)
- [Usage](#usage)
- [Results](#results)
- [Future Work](#future-work)
- [References](#references)
- [License](#license)

---

## Introduction 📖
The **Bayesian Empirical Likelihood Ratio (BELR)** algorithm addresses limitations of traditional Naive Bayes classifiers by directly computing the likelihood ratio \( K = \frac{P(B|A)}{P(B)} \) from data. This eliminates unrealistic feature independence assumptions and improves accuracy in scenarios with correlated features, small datasets, or mixed data types.

**Key Contributions**:
1. Data-driven estimation of \( K \).
2. Support for discrete and continuous features.
3. Built-in calibration and dimensionality correction.

---

## Key Features ✨
- 🚫 **No Independence Assumptions**: Captures feature dependencies.
- 📊 **Flexible Data Handling**: Works with discrete (frequency counts) and continuous (KDE/regression) data.
- ⚖️ **Calibration**: Reduces overconfidence in probability estimates.
- ⚡ **Efficiency**: \( O(N \cdot d) \) training complexity for categorical features.
- 🔍 **Interpretability**: Quantify feature importance via \( K \).

---

## Installation 🛠️
```bash
pip install belr
```
**Dependencies**:
- Python 3.8+
- NumPy
- SciPy
- scikit-learn
- PyMC3 (optional for Bayesian extensions)

---

## Algorithm Overview 📝

### Input
- Dataset \( D = \{(x_i, y_i)\} \), where \( x_i \in \mathbb{R}^d \), \( y_i \in \{1, \dots, C\} \).
- Smoothing parameter \( \alpha \) (default=1).
- Density estimation method \( M \) (default=Kernel Density Estimation).

### Steps
1. **Preprocessing**:
   - Normalize continuous features.
   - Encode categorical variables into frequency tables.
   - Split data into \( K \)-folds.

2. **Likelihood Ratio Estimation**:
   ```python
   for class c in classes:
       prior = (count(c) + α) / (N + C * α)
       for feature j in features:
           if categorical:
               P(x_j|c) = (count(x_j in c) + α) / (count(c) + d_j * α)
               K_j(c) = P(x_j|c) / P(x_j)
           else:
               Fit density estimator M to compute K_j(c)
   ```

3. **Posterior Calculation**:
   \[
   K(c) = \left( \prod_{j=1}^d K_j(c) \right)^{1/\sqrt{d}}, \quad P(c|x^*) = \frac{\min(1, K(c) \cdot P(c))}{Z}
   \]

---

## Usage 🚀
```python
from belr import BELRClassifier

# Load dataset
X, y = load_dataset()

# Initialize and train
model = BELRClassifier(alpha=1, density_method='kde')
model.fit(X, y)

# Predict
probabilities = model.predict_proba(X_test)
```

---

## Results 📈

### Practical Implications of \( K \)
| \( K \) Range   | Interpretation               | Action                          |
|------------------|-------------------------------|---------------------------------|
| \( K > 10 \)     | Strong evidence for class    | Prioritize in classification   |
| \( 1 < K < 10 \) | Moderate evidence            | Use as supporting evidence     |
| \( K = 1 \)      | No evidence                  | Ignore feature                 |
| \( 0 < K < 1 \)  | Evidence against class       | Penalize class probability     |

### Performance Metrics
![AUC-ROC Comparison](media/image8.png)  
*BELR vs. Naive Bayes on imbalanced datasets.*

---

## Future Work 🔮
- **Deep Learning Integration**: Normalizing flows for complex distributions.
- **Online Learning**: Incremental updates for streaming data.
- **Causal Inference**: Extend \( K \) to interventional probabilities.
- **GPU Acceleration**: CUDA-optimized KDE.

---

## References 📚
1. Gelman, A., et al. (2013). *Bayesian Data Analysis*. Chapman and Hall/CRC.
2. Pearl, J. (2009). *Causality*. Cambridge University Press.
3. [Full Reference List](REFERENCES.md)

---

## License 📄
MIT License. See [LICENSE](LICENSE) for details.
```

---

### Notes for Implementation:
1. Replace image placeholders (`media/image8.png`) with actual plots.
2. Add a `REFERENCES.md` file for detailed citations.
3. Include example datasets in the `examples/` folder.
4. Use [Google-style docstrings](https://google.github.io/styleguide/pyguide.html) for code documentation.