from datetime import datetime, timedelta
from logging import Logger, getLogger
from re import findall
from typing import List, Optional

from bs4 import BeautifulSoup
from pytz import timezone
from requests import Response, Session

from .lib.exceptions import ParserException

IFRAME_URL = "https://grafik.kraftnat.ax/grafer/tot_inm_24h_15.php"
TIME_ZONE = "Europe/Mariehamn"
SOURCE = "kraftnat.ax"


def fetch_data(session: Session, logger: Logger):
    """Fetch data from the iFrame."""

    response: Response = session.get(IFRAME_URL)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser").find_all("script")
    result_time_series = findall(r"data: \[(.*?)\]", str(soup))
    if len(result_time_series) != 3:
        raise ParserException(
            "AX.py",
            "Did not find the expected amount of results. Check if the website has changed.",
        )
    time_series: List = result_time_series[0].split(",")
    raw_data: List[str] = findall(r"data:\[(.*?)\]", str(soup))
    if len(raw_data) != 6:
        raise ParserException(
            "AX.py",
            "The raw data did not match the expected format. Check if the website has changed.",
        )
    for raw in raw_data:
        if len(raw.split(",")) != len(time_series):
            raise ParserException(
                "AX.py",
                "The raw data did not match the length of the the time series. Check if the website has changed.",
            )
    data_list = []
    for time, sweden, alink, fossil, gustavs, wind, consumption in zip(
        time_series,
        raw_data[0].split(","),
        raw_data[1].split(","),
        raw_data[2].split(","),
        raw_data[3].split(","),
        raw_data[4].split(","),
        raw_data[5].split(","),
    ):
        data_list.append(
            {
                "time": str(time.replace('"', "")),
                "sweden": float(sweden),
                "alink": float(alink),
                "fossil": float(fossil),
                "gustavs": float(gustavs),
                "wind": float(wind),
                "consumption": float(consumption),
            }
        )
    return data_list


def formated_data(
    zone_key: Optional[str],
    zone_key1: Optional[str],
    zone_key2: Optional[str],
    session: Session,
    logger: Logger,
    type: str,
):
    """Format data to Electricity Map standards."""
    data_list = fetch_data(session, logger)
    data_list.reverse()
    date_time = datetime.now(timezone(TIME_ZONE))
    date = date_time.replace(
        hour=int(data_list[0]["time"].split(":")[0]),
        minute=int(data_list[0]["time"].split(":")[1]),
        second=0,
        microsecond=0,
    )
    if date > date_time:
        date = date - timedelta(days=1)
    return_list = []
    for data in data_list:
        corrected_date = date - timedelta(minutes=15 * data_list.index(data))
        if type == "production":
            return_list.append(
                {
                    "zoneKey": zone_key,
                    "production": {
                        "wind": data["wind"],
                        "oil": data["fossil"],
                    },
                    "datetime": corrected_date,
                    "source": SOURCE,
                }
            )
        elif type == "consumption":
            return_list.append(
                {
                    "zoneKey": zone_key,
                    "datetime": corrected_date,
                    "consumption": data["consumption"],
                    "source": SOURCE,
                }
            )
        elif type == "exchange":
            if zone_key1 == "AX" and zone_key2 == "SE-SE3":
                return_list.append(
                    {
                        "sortedZoneKeys": "AX->SE-SE3",
                        "datetime": corrected_date,
                        "netFlow": data["sweden"] * -1,
                        "source": SOURCE,
                    }
                )
            elif zone_key1 == "AX" and zone_key2 == "FI":
                return_list.append(
                    {
                        "sortedZoneKeys": "AX->FI",
                        "datetime": corrected_date,
                        "netFlow": round(data["alink"] + data["gustavs"], 2) * -1,
                        "source": SOURCE,
                    }
                )
            else:
                raise ParserException(
                    "AX.py",
                    "This parser can only fetch data between Åland <-> Sweden and Åland <-> Finland",
                )
        else:
            raise ParserException(
                "AX.py",
                "The datasource currently implemented is only for production, consumption and exchange data",
                zone_key,
            )
    return return_list


def fetch_production(
    zone_key: str = "AX",
    session: Session = Session(),
    target_datetime: Optional[datetime] = None,
    logger: Logger = getLogger(__name__),
) -> List[dict]:
    """Fetch production data."""

    if target_datetime is not None:
        raise ParserException(
            "AX.py", "The datasource currently implemented is only for real time data"
        )

    return formated_data(
        zone_key=zone_key,
        zone_key1=None,
        zone_key2=None,
        session=session,
        logger=logger,
        type="production",
    )


def fetch_consumption(
    zone_key: str = "AX",
    session: Session = Session(),
    target_datetime: Optional[datetime] = None,
    logger: Logger = getLogger(__name__),
) -> List[dict]:
    """Fetch consumption data."""

    if target_datetime is not None:
        raise ParserException(
            "AX.py", "The datasource currently implemented is only for real time data"
        )

    return formated_data(
        zone_key=zone_key,
        zone_key1=None,
        zone_key2=None,
        session=session,
        logger=logger,
        type="consumption",
    )


def fetch_exchange(
    zone_key1: str,
    zone_key2: str,
    session: Session = Session(),
    target_datetime: Optional[datetime] = None,
    logger: Logger = getLogger(__name__),
) -> List[dict]:
    """Fetch exchange data."""

    if target_datetime is not None:
        raise ParserException(
            "AX.py", "The datasource currently implemented is only for real time data"
        )

    return formated_data(
        zone_key=None,
        zone_key1=zone_key1,
        zone_key2=zone_key2,
        session=session,
        logger=logger,
        type="exchange",
    )
