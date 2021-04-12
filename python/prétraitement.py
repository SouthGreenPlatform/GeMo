# import ####

import pandas as pd
import time
import csv
start_time = time.time()  

# window size modifer ####

def window_size_modifier(x):
    global window_size
    window_size = x
window_size_modifier(5000)


#init tableau de retour
tableau_traité = []

#ouverture du fichier à lire
dataset = pd.read_csv('DYN_ITC0786_Katual_no2_ratio.tab', sep="\t")


#compteur de lignes traité
count = 0

#débute à 0 et première ligne de label donc len(dataset - 2)
while(count < len(dataset)-1):
    

        
    #initialisation des bornes
    index_min = count
    index_max = index_min + window_size
    #iterator
    current = index_min
        
    
    #initialisation du dico de retour
    data = {'chr':'None','start':'None','end':'None'}
    
    data['start'] = dataset.loc[index_min,'pos']
    
    #initialisation du dico servant à stocker le nb d'occurence de chaque origine (pour la moyenne)
    origin = {}
        
    #dernier chr traité   
    chr = dataset.loc[current,'chr']
    
        
#    print('----------------------\ninformations avant traitement de la fenêtre :\n')
#    print('index_min : {}'.format(index_min))
#    print('index_max : {}'.format(index_max))
#    print('current : {}'.format(current))
#    print('data : {}'.format(data))
#    print('origin : {}\n'.format(origin))
#    print('----------------------')
    
    #1ere condition : même chromosome que le dernier traité
    #2eme condition : toujours dans la fenêtre voulu
    #3eme condition : la prochaine ligne de données n'est pas nul
    #boucle servant à rentrer les données dans un dico(data), faisant la somme des valeurs (obs/expect)
    # et entrant le nombre d'occurence des origines dans un autre dico (origin)
    
    print('Ligne traité : {}'.format(current))
        
    while(count < len(dataset) and dataset.loc[current] is not None and dataset.loc[current,'chr'] == chr and count < (window_size + index_min)):
        

        data['chr'] = dataset.loc[current,'chr']
        data['end'] = dataset.loc[current,'pos']
        grp = dataset.loc[current,'grp']
        
   
        value = dataset.loc[current,'obs_ratio'] / dataset.loc[current,'exp_ratio']
        
        
        if(grp not in data and grp not in origin):
            origin[grp] = 0
            data[grp] = 0
        data[grp] = data[grp] + value
        origin[grp] = origin[grp] + 1
        
        count = count + 1
        current = current + 1
        
    
    #division des valeurs des origines contenu dans data par leur nb d'occurence pour obtenir la moyenne
    
    for elem in origin:
        if(data[elem] / origin[elem] > 1):
            data[elem] = 1
        else:    
            data[elem] = data[elem] / origin[elem]
        
#    print('----------------------\ninformations après traitement de la fenêtre :\n')
#    print('index_min : {}'.format(index_min))
#    print('index_max : {}'.format(index_max))
#    print('current : {}'.format(current))
#    print('data : {}'.format(data))
#    print('origin : {}\n'.format(origin))    
    

    #ajout du dico remplie avec les lignes traités dans une liste (tableau_traité)
    
    tableau_traité.append(data)
    
#Ecriture du résultat dans un fichier csv 
    
with open("output.csv", "w",newline='') as f:
    writer = csv.DictWriter(f,fieldnames=['chr','start','end','V','T','S','E','B','A_z','A_u','A_s','A_m','A_j','A_b'],delimiter='\t')
    writer.writeheader()
    writer.writerows(tableau_traité)
    f.close
    
print("--- %s seconds ---" % (time.time() - start_time))
    
    
    
    
    
    
    
    
    