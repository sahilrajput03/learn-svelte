from sklearn.linear_model import LinearRegression
import numpy as np

# Input data (hours studied)
X = np.array([[1], [2], [3], [4], [5]])  # Shape is (5,1) to meet model input requirements

# Output data (exam scores)
Y = np.array([50, 60, 65, 70, 75])  # Shape is (5,)

# Initialize the model
model = LinearRegression()

# Train the model on the data
model.fit(X, Y)


# Predict exam score for 6 hours of study
predicted_score = model.predict([[6]])
print(f"Predicted score for 6 hours of study: {predicted_score[0]}")
