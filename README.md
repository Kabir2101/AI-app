# AI-app
## This is max the virtual assistant. He is very smart.
### If you want to make him smarter, feel free to add some more questions to the data.js file.
## Sub Topic Headings H2
Sub Topic Headings H2 is used for sub sections like Configurations, Authors etc.

````
pip install boto
````

The above formatting is used to create a box which can display code or command in a well formatted manner.


## Usage

Below is another example of displaying
````python
import csv

with open("sample.csv","r") as csvinput: # read input csv file
    reader = csv.reader(csvinput) # create a reader
    for row in reader:
        print(row[0])
