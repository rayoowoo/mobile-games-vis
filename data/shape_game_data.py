#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
from fastparquet import write


# In[2]:


data = pd.read_csv('appstore_games.csv')


# In[3]:


print ("null values: \n")
print(data.isna().sum())


# In[4]:


print("total null values: ", data.isna().sum().sum())


# In[5]:


# Handling Missing Data


# In[6]:


data[['Subtitle', 'Languages']] = data[['Subtitle', 'Languages']].fillna(value="No info")
data[['Average User Rating', 'User Rating Count', 'Price', 'In-app Purchases', 'Size']] = data[['Average User Rating', 'User Rating Count', 'Price', 'In-app Purchases', 'Size']].fillna(value=0.0)


# In[7]:


# Handling duplicated data


# In[8]:


duplicate_data = data[data.duplicated()]
print("number of duplicated rows: ", duplicate_data.shape)


# In[9]:


duplicate_data_URL = data[data.duplicated(['URL'])]
print(duplicate_data_URL.shape)


# In[10]:


print(len(data.URL.unique()))


# In[11]:


print("shape of dataframe after dropping duplicates: ", data.drop_duplicates().shape)


# In[12]:


# Data binning


# In[13]:


play_labels = ["No rating. Who knows?", 'horrible', 'somewhat playable', 'awesome']
category = [-1, 0.1, 2., 3.5, 5.]
data['Playability'] = pd.cut(data['Average User Rating'], labels=play_labels, bins=category, include_lowest=False)


# In[14]:


print(data[['URL', 'Name', 'Average User Rating', 'Playability']])


# In[22]:


data['Language Count'] = data.apply(lambda row: row['Languages'].count(',')+1, axis=1)


# In[ ]:


# TODO: adjust the category to start from 0.1, that way 0.0 means no rating. and if no rating, clean up NaN's from
# plability to read "no rating, who knows"


# In[21]:


data


# In[18]:


data['In-app Purchases'] = data['In-app Purchases'].astype(str)


# In[19]:


write('games.parq', data)

