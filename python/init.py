import mariadb
import sys
import re

try:
    conn = mariadb.connect(
        user="mysqlusr",
        password="mysqlpwd",
        host="database",
        port=3306,
        database="parc"
    )
    cur = conn.cursor()

    def execute_sql_file(filename):
        with open(filename) as f:
            fichier = f.read()
            lines = fichier.split(";")
            for line in lines:
                line = line.strip()
                if line:
                    try:
                        cur.execute(line)
                    except mariadb.Error as e:
                        print(f"Error executing SQL: {e}")
                        conn.rollback()
                        conn.close()
                        sys.exit(1)

    execute_sql_file('sql_file/init.sql')
    execute_sql_file('sql_file/create.sql')

    conn.commit()
    conn.close()

except mariadb.Error as e:
    print(f"Erreur lors de la connection à la base de données: {e}")
    sys.exit(1)