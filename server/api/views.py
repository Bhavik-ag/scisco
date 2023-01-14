import requests

from rest_framework.generics import ListAPIView
from rest_framework.response import Response

class platformView(ListAPIView):

    def get(self, request, *args, **kwargs):
        self.__platform = kwargs.get('platform')
        self.__username = kwargs.get('username')

        if self.__platform == "codeforces":
            return self.__codeforces()
        elif self.__platform == "codechef":
            return self.__codechef()
        elif self.__platform == "leetcode":
            return self.__leetcode()
        elif self.__platform == "atcoder":
            return self.__atcoder()
        else:
            return Response({"status": 404, "message" : "Platform not found"})
        
    def __codeforces(self):
        api_urls = {
            "user_info": {"url": f'https://codeforces.com/api/user.info?handles={self.__username}'},
            "user_submissions" : {"url": f'https://codeforces.com/api/user.status?handle={self.__username}&from=1&count=10'},
        }

        response = requests.get(api_urls["user_info"]["url"])
        if(response.status_code != 200):
            return Response({"status": 404, "message" : "User not found"})
            
        user_data = response.json()

        if(user_data["status"] != "OK"):
            return Response({"status": 404, "message" : "User not found"})

        #Formatting the data to be sent to the frontend
        data = {}
        data["status"] = 200    
        data["handle"] = user_data["result"][0]["handle"]

        try:
            data["name"] = user_data["result"][0]["firstName"] + " " + user_data["result"][0]["lastName"]
        except:
            data["name"] = ""

        data["rating"] = user_data["result"][0]["rating"]
        data["maxRating"] = user_data["result"][0]["maxRating"]
        data["rank"] = user_data["result"][0]["rank"]
        data["maxRank"] = user_data["result"][0]["maxRank"]
        data["titlePhoto"] = user_data["result"][0]["titlePhoto"]
        data["submissions"] = []
        
        response = requests.get(api_urls["user_submissions"]["url"])
        if(response.status_code == 200):
            submission_data = response.json()
            if(submission_data["status"] == "OK"):
                for problem in submission_data["result"]:
                    data["submissions"].append({
                        "problemName": problem["problem"]["name"],
                        "problemLink": f"https://codeforces.com/problemset/problem/{problem['problem']['contestId']}/{problem['problem']['index']}",
                        "problemTags": problem["problem"]["tags"]
                    })  

        return Response(data)

    def __codechef(self):
        pass 

    def __leetcode(self):
        pass

    def __atcoder(self):
        pass

platform_view = platformView.as_view()